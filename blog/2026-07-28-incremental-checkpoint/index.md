---
slug: incremental-checkpoint
title: "The Struggles of Incremental Checkpoints: Lock Storms and Full Page Writes"
authors: [吕海波]
category: IvorySQL
image: img/blog/covers/incremental-ckpt.png
tags: [PostgreSQL, Checkpoint, Kernel, Performance, FPW, HOW2026]
---

> Based on Lyu Haibo's presentation at HOW 2026. Lyu is Chief Researcher at Yijing Technology, PG ACED, and Enterprise Mentor at Peking University.

## 1. Why Incremental Checkpoints?

While building a shared-storage cluster architecture (similar to Oracle RAC) based on PostgreSQL, a practical problem emerged: when using PG's original full checkpoint mechanism, dirty pages continuously accumulated across nodes, capping stress test performance. To solve this, we introduced incremental checkpoints.

The core idea isn't complex: add a checkpoint queue (ckptq) in shared memory, ordering all dirty blocks by their "dirtied" time, then flush them along the queue in high-frequency, small-batch increments. Compared to full checkpoints traversing all dirty pages at once, this theoretically smooths I/O load.

But actual implementation revealed two problems trickier than expected: ckptq shared memory lock management, and the coupling between incremental checkpoints and FPW (Full Page Writes).

## 2. ckptq Shared Memory Lock Management: The Hidden Cost of Spinlock Contention

Placing ckptq in shared memory means multi-process concurrent dirty block access inevitably involves lock management. We initially used PG's built-in SpinLock, but severe performance issues emerged under high contention.

### 2.1 What is a Spinlock?

A spinlock is essentially a memory variable — 1, 2, 4, or 8 bytes. Process A holding the lock changes the value from 0 to 1; Process B, finding the value non-zero, keeps looping until it returns to 0. This "busy waiting" avoids yielding the CPU, preventing context switches and cache pollution.

The problem: when multiple processes compete for the same spinlock, the consequences go far beyond CPU spinning.

### 2.2 Inter-Core Communication Storm

With 16 cores, suppose Core 0 holds the lock and 15 cores are spinning. When Core 0 releases the lock (changing 1 to 0):

1. Core 0 must broadcast **Invalidate** messages to all 15 cores, notifying them that their L1/L2 cache copies are stale
2. After all cores acknowledge, Core 0 modifies the variable to 0
3. The 15 waiting cores immediately send **Write Update** messages to Core 0 requesting the latest value
4. After CPU arbitration, one core (say Core 9) gains modification rights, broadcasting **Write Invalidate** to 15 others
5. After all confirm, Core 9 sets the variable to 1, acquiring the lock

One lock release-reacquire cycle involves dozens of inter-core message broadcasts. At 16 cores this is already significant; modern CPUs with tens or hundreds of cores amplify this enormously. **Round after round of message synchronization can degrade i9 performance to 386 levels.** This is the "lock storm" — hotspot contention compounded by inter-core communication latency.

This isn't unique to incremental checkpoints. Any spinlock in PG experiencing contention can trigger the same inter-core communication storm, causing performance jitter.

### 2.3 Improvement Approach

The solution's inspiration comes from CPU cache coherence protocols and RAC's cache fusion. The core idea: assign each core its own independent lock variable. When spinning, each core only polls its own variable — no broadcast messages needed.

To release the lock, the holder sends a single modification message to the target core's private variable, completing ownership transfer. This reduces inter-core communication from O(n²) to O(1). See the paper "Non-scalable locks are dangerous" — traditional spinlock scalability issues in many-core systems have long been established, just easily overlooked in practice.

## 3. Incremental Checkpoints & FPW: Page Split Impact Analysis

In PG, full checkpoints and FPW are tightly coupled. Introducing incremental checkpoints dramatically extends full checkpoint intervals — what does this mean for FPW's ability to protect against page splits?

### 3.1 What is a Page Split (Partial Write)?

A database page (e.g., PG's 8KB) typically consists of multiple OS pages (e.g., 4KB) at the OS level. When the database initiates an 8KB write, it's actually two 4KB writes at the storage layer. If power fails mid-write, you might get the first 4KB written but not the second — the database page becomes "half new, half old" corrupted state. This is a page split.

### 3.2 Simulating Page Splits

Page splits have long been hard to verify because outside of pulling the power cable, they're nearly impossible to reproduce. But using kernel dynamic tracing tools like eBPF/systemtap, you can intercept `pwrite` syscalls and tamper with the write length from 8KB to 4KB — the OS dutifully writes only half. This perfectly simulates page splits while excluding all other interfering factors.

We tested Oracle, PostgreSQL, and MySQL under the same conditions.

### 3.3 Oracle: No Software-Level Solution

Intercepting `pwrite` during checkpoint flushing, Oracle detects I/O errors and crashes. On restart, instance recovery begins — it locates the checkpoint position, identifies dirty blocks needing recovery — then fails.

The test conclusion is clear: Oracle doesn't solve page splits at the software level. It doesn't rely on filesystem atomic writes, nor does it special-handle the code. Oracle's strategy: detect corruption, rely on backups for media recovery, and provide BlockRecover for single-block recovery. **Pushing the problem to operations is itself a choice.**

### 3.4 PostgreSQL: Completely Solved

Under the same procedure, PG didn't crash on I/O errors — it only reported them. We used `kill -9` to kill all processes simulating an unexpected crash. On restart, PG read the checkpoint position from the control file, applied corresponding WAL logs — data fully recovered, zero loss.

**Through the FPW mechanism, PG writes the entire page to WAL on first modification, ensuring that even if a page split occurs, the log can completely redo the page.** The cost: obvious I/O amplification. The benefit: deterministic data consistency.

### 3.5 MySQL (InnoDB): Double Write Limitations

MySQL InnoDB uses a double-write mechanism: write pages to the double-write buffer first, then to the actual data file. Tests revealed:

- If only target table file writes are intercepted, double-write can recover
- But if system tablespace writes (e.g., undo tablespace) are intercepted, **the database fails to start, unrecoverable**

Conclusion: **Double-write solves page splits in some scenarios but fails when system tablespace is damaged.** In a real "power loss + system tablespace write truncation" scenario, double-write cannot guarantee database recovery.

### 3.6 Three-DB Comparison

| Database | Solution | Truly Solves Page Splits? |
|----------|---------|--------------------------|
| Oracle | Backup + block recovery | Not at software level |
| MySQL | Double Write | Partial; fails on system tablespace damage |
| PostgreSQL | Full Page Write | Complete, at performance cost |

Among the three mainstream databases, **only PG sacrifices performance to truly solve page splits at the software level.** Oracle pushes it to hardware/operations; MySQL's double-write has blind spots on the critical path.

Back to the TC architecture: the underlying custom shared storage supports atomic writes, so FPW can be disabled in TC. But for users without atomic write storage — is FPW truly optional? No standard answer. Interested readers should follow this presentation's steps, actually simulate page splits, experience the fundamentals firsthand, then decide.
