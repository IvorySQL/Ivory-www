---
slug: ivorysql-mirror-troubleshooting
title: 等了20分钟镜像没拉完？国内源30秒搞定IvorySQL+避坑指南
authors: [ShunWah]
category: IvorySQL
image: img/blog/covers/mirror-troubleshooting.jpg
tags: [IvorySQL, Docker, Mirror, openEuler, Troubleshooting, PostgreSQL]
---

先问一个问题：你有没有因为拉一个 Docker 镜像等到怀疑人生？

我有。

去年底想在一台测试机上跑 IvorySQL 5.0，执行 `docker pull ivorysql/ivorysql:5.0-ubi8`，然后就去泡了杯咖啡。咖啡喝完，进度条走了 30%。又刷了会儿手机，还是 50%。最后干脆去开了个会，回来总算拉完了——前前后后快二十分钟。

你说这算技术问题吗？不算。但这就是劝退很多人的"第一公里"。

所以当我听说 IvorySQL 社区在 `registry.highgo.com` 上线了国内镜像源，第一反应是：**终于来了。**

这篇文章我不会跟你念产品文档。咱们就像平时在技术群里闲聊那样，聊聊这个镜像源到底好不好用、怎么用、以及我踩到的那些坑。

## 一、镜像仓库地址

先放地址：[https://registry.highgo.com/](https://registry.highgo.com/)

这个镜像服务面向国内网络环境做了优化，适合开发测试、演示验证、CI 构建以及容器化部署场景。说白了就是——在国内拉镜像，不用再绕道 Docker Hub 了。

## 二、快速体验 IvorySQL 镜像

### 2.1 拉取镜像

如果你之前看过 IvorySQL 的 Docker 安装文档，操作方式几乎一样，只需要把镜像地址替换成国内的就行。

以 IvorySQL 5.3 的 UBI8 镜像为例：

```bash
docker pull registry.highgo.com/ivorysql/ivorysql:5.3-ubi8
```

我在 openEuler 服务器上实际跑了一下，效果是这样的：

```bash
[root@openeuler-server ~]# docker pull registry.highgo.com/ivorysql/ivorysql:5.3-ubi8
5.3-ubi8: Pulling from ivorysql/ivorysql
4fba3effa6b3: Pull complete 
4cc358cba85f: Pull complete 
c4453bb8971d: Pull complete 
d396d38d02c2: Pull complete 
4406b6bc22b7: Pull complete 
52bcb2e0d3b6: Pull complete 
bc3a2a4b7a5d: Pull complete 
addd7eda355c: Pull complete 
c566c56fc71d: Pull complete 
5354ee8271dc: Pull complete 
6adc3134ae3c: Pull complete 
4f4fb700ef54: Pull complete 
Digest: sha256:c877f3d50eb7d5edb96da5d1f939890ba6f9b031b83faee893403b8de0622c82
Status: Downloaded newer image for registry.highgo.com/ivorysql/ivorysql:5.3-ubi8
registry.highgo.com/ivorysql/ivorysql:5.3-ubi8
[root@openeuler-server ~]#
```

**实测效果**：我本地用 Docker Hub 拉取同一个镜像，平均速度几百 KB/s，有时候还会断连重试。换成国内镜像源之后，速度直接飙到几十 MB/s。从"泡杯咖啡等它拉完"变成"刚起身水还没倒好就结束了"。

拉完之后校验一下：

```bash
docker images | grep ivorysql
```

我在服务器上执行的结果：

```bash
[root@openeuler-server ~]# docker images | grep ivorysql
registry.highgo.com/ivorysql/ivorysql               5.3-ubi8   2af458997451   3 months ago   417MB
[root@openeuler-server ~]#
```

能看到 IMAGE ID 和 SIZE，说明镜像下载完整、没有损坏。

### 2.2 启动容器（附带踩坑实录）

拉取完成后，用下面的命令启动 IvorySQL 容器：

```bash
docker run --name ivorysql -p 5432:5432 -p 1521:1521 \
  -e IVORYSQL_PASSWORD=PKsjj@112!! -d \
  registry.highgo.com/ivorysql/ivorysql:5.3-ubi8
```

> ⚠️ **第一个坑：命令被"截断"了**

我第一次执行的时候，因为多行复制时不小心混入了别的命令，结果报了这个错：

```bash
[root@openeuler-server ~]# docker run --name ivorysql -p 5432:5432 -p 1521:1521 \
>   -e IVORYSQL_PASSWORD=PKsjj@112!! -d \
  -e IVORYSQL_PASSWORD=PKsjj@112docker images | grep ivorysql -d \
>   registry.highgo.com/ivorysql/ivorysql:5.3-ubi8
grep: '--directories' 的参数 'registry.highgo.com/ivorysql/ivorysql:5.3-ubi8' 无效
有效参数是:
  - 'read'
  - 'recurse'
  - 'skip'
用法: grep [选项]... 模式 [文件]...
尝试使用 'grep --help' 来获得更多信息。
Unable to find image 'images:latest' locally
^C
[root@openeuler-server ~]#
```

仔细一看，原来是 `-e IVORYSQL_PASSWORD=PKsjj@112docker ps` 这一串出了问题——Docker 把 `PKsjj@112docker ps` 当成了完整的密码值，后面的 `-d` 被当成了镜像名，然后它跑去 Docker Hub 找了一个叫 `ps` 的镜像，当然找不到。

**解决办法**：要么用单行命令，要么用 `\` 换行时确保每行末尾没有多余空格。最简单的是直接单行执行：

```bash
docker run --name ivorysql -p 5432:5432 -p 1521:1521 -e IVORYSQL_PASSWORD=PKsjj@112!! -d registry.highgo.com/ivorysql/ivorysql:5.3-ubi8
```

但换了单行之后，又出幺蛾子了：

```bash
[root@openeuler-server ~]# docker run --name ivorysql -p 5432:5432 -p 1521:1521 -e IVORYSQL_PASSWORD=PKsjj@112!! -d registry.highgo.com/ivorysql/ivorysql:5.3-ubi8
docker run --name ivorysql -p 5432:5432 -p 1521:1521 -e IVORYSQL_PASSWORD=PKsjj@112docker ps -d registry.highgo.com/ivorysql/ivorysql:5.3-ubi8
Unable to find image 'ps:latest' locally
docker: Error response from daemon: Get "https://registry-1.docker.io/v2/": dial tcp 103.39.76.66:443: connect: connection timed out.
See 'docker run --help'.
```

问题还是同一个——`-e IVORYSQL_PASSWORD=PKsjj@112docker ps` 这串命令里，密码和参数之间没有空格，Docker 直接懵了。

**最终正确姿势**：确保密码和 `-d` 之间有一个明确的空格分隔。

```bash
docker run --name ivorysql -p 5432:5432 -p 1521:1521 -e IVORYSQL_PASSWORD=g4Bw#QPY4^t%87xTy -d registry.highgo.com/ivorysql/ivorysql:5.3-ubi8
```

这次终于成功了：

```bash
[root@openeuler-server ~]# docker run --name ivorysql -p 5432:5432 -p 1521:1521 -e IVORYSQL_PASSWORD=g4Bw#QPY4^t%87xTy -d registry.highgo.com/ivorysql/ivorysql:5.3-ubi8
5856d79e1f85a51945e31e68ae21161d2e6dc2806697fffa9e0485e02df32f48
[root@openeuler-server ~]#
```

用 `docker ps` 确认一下容器状态：

```bash
[root@openeuler-server ~]# docker ps
CONTAINER ID   IMAGE                                            COMMAND                  CREATED              STATUS              PORTS                                                                                            NAMES
5856d79e1f85   registry.highgo.com/ivorysql/ivorysql:5.3-ubi8   "docker-entrypoint.s…"   About a minute ago   Up About a minute   0.0.0.0:1521->1521/tcp, :::1521->1521/tcp, 0.0.0.0:5432->5432/tcp, :::5432->5432/tcp, 5866/tcp   ivorysql
[root@openeuler-server ~]#
```

> 💡 **一点小建议**：这种因为复制粘贴、不小心多按了几个键导致的"乌龙"报错，在运维里太常见了。以后遇到 `Unable to find image 'xxx:latest' locally` 这种报错，第一反应先检查命令里是不是多了什么奇怪的字符，往往比排查网络、镜像源要快得多。

### 2.3 双端口的意义

这里有两个端口需要留意一下：

- **5432 端口**：兼容 PostgreSQL 原生语法
- **1521 端口**：对标 Oracle 访问端口，适配 Oracle 语法

为什么要同时暴露两个端口？因为 IvorySQL 的核心定位就是 **Oracle 兼容**。你在 1521 端口上连接，可以体验到 IvorySQL 针对 Oracle 语法做的兼容适配；在 5432 端口上连接，又像在用标准 PostgreSQL。同一个容器，两套语法，方便你在迁移评估阶段做对比测试。

### 2.4 连接数据库的波折

容器启动后，我想通过 1521 端口连接数据库：

```bash
psql -d ivorysql -U ivorysql -h 127.0.0.1 -p 1521
```

结果：

```bash
[root@openeuler-server ~]# psql -d ivorysql -U ivorysql -h 127.0.0.1 -p 1521
-bash: psql：未找到命令
[root@openeuler-server ~]#
```

> ⚠️ **第二个坑：宿主机没有 psql 客户端**

`psql` 是 PostgreSQL 自带的命令行客户端工具，不会随 Docker 自动安装到宿主机上。在 openEuler 系统里直接敲 `psql`，系统当然找不到。

**解决方法**：直接用 `docker exec` 进入容器内部执行：

```bash
docker exec -it ivorysql psql -d ivorysql -U ivorysql
```

结果又报错了：

```bash
[root@openeuler-server ~]# docker exec -it ivorysql psql -d ivorysql -U ivorysql
psql: error: connection to server on socket "/tmp/.s.PGSQL.5432" failed: FATAL:  the database system is not yet accepting connections
DETAIL:  Consistent recovery state has not been yet reached.
[root@openeuler-server ~]#
```

### 2.5 排查过程：日志暴露真凶

容器状态显示 `Up` 只代表容器进程跑起来了，不代表数据库内核加载完毕。这时候需要看日志：

```bash
docker logs ivorysql --tail 50
```

我看到的日志是这样的：

```bash
[root@openeuler-server ~]# docker logs ivorysql --tail 50
2026-06-17 09:06:57.008 UTC [1] LOG:  checkpointer process (PID 4442) was terminated by signal 6: Aborted
2026-06-17 09:06:57.008 UTC [1] LOG:  terminating any other active server processes
2026-06-17 09:06:57.009 UTC [1] LOG:  all server processes terminated; reinitializing
2026-06-17 09:06:57.043 UTC [4447] LOG:  database system shutdown was interrupted; last known up at 2026-06-17 09:06:56 UTC
2026-06-17 09:06:57.067 UTC [4447] LOG:  database system was not properly shut down; automatic recovery in progress
2026-06-17 09:06:57.068 UTC [4447] LOG:  redo starts at 0/1ED9BC0
2026-06-17 09:06:57.068 UTC [4447] LOG:  invalid record length at 0/1ED9BF8: expected at least 24, got 0
2026-06-17 09:06:57.068 UTC [4447] LOG:  redo done at 0/1ED9BC0 system usage: CPU: user: 0.00 s, system: 0.00 s, elapsed: 0.00 s
2026-06-17 09:06:57.071 UTC [4448] LOG:  checkpoint starting: end-of-recovery immediate wait
2026-06-17 09:06:57.071 UTC [4448] PANIC:  could not write to file "pg_logical/replorigin_checkpoint.tmp": No space left on device
...（省略部分重复日志）
2026-06-17 09:06:58.752 UTC [4472] PANIC:  could not write to file "pg_logical/replorigin_checkpoint.tmp": No space left on device
[root@openeuler-server ~]#
```

> ⚠️ **第三个坑：磁盘空间满了**

关键报错是 `No space left on device`。数据库启动时需要写临时文件做 checkpoint，但磁盘已经满了。

用 `df -Th` 确认一下：

```bash
[root@openeuler-server ~]# df -Th
文件系统                                     类型      容量  已用  可用 已用% 挂载点
devtmpfs                                     devtmpfs  4.0M     0  4.0M    0% /dev
tmpfs                                        tmpfs      16G  8.0K   16G    1% /dev/shm
tmpfs                                        tmpfs     6.2G  636M  5.6G   11% /run
tmpfs                                        tmpfs     4.0M     0  4.0M    0% /sys/fs/cgroup
/dev/mapper/openeuler_openeuler--server-root ext4       41G   39G     0  100% /
tmpfs                                        tmpfs      16G  4.0K   16G    1% /tmp
/dev/sda2                                    ext4      920M  312M  545M   37% /boot
overlay                                      overlay    41G   39G     0  100% /var/lib/docker/overlay2/cbcb4ac63b0ff3f5953c8cda779af0d2b530eae3aeeebc76ebb09e0c3b36083a/merged
[root@openeuler-server ~]#
```

**根分区 `/` 可用空间为 0，已用 100%**。这就是 IvorySQL 容器反复崩溃的根源。

### 2.6 解决方案：迁移 Docker 数据目录

好消息是服务器上还有一块 100G 的空闲磁盘 `/dev/sdb1`。我把 Docker 的数据目录整个迁过去：

```bash
# 停止 Docker 服务
systemctl stop docker

# 把 Docker 数据目录迁移到新盘
mv /var/lib/docker /data/

# 创建软链接指向新位置
ln -s /data/docker /var/lib/docker

# 重启 Docker
systemctl start docker
```

实际执行记录：

```bash
[root@openeuler-server ~]# systemctl stop docker
[root@openeuler-server ~]# mv /var/lib/docker /data/
[root@openeuler-server ~]# ln -s /data/docker /var/lib/docker
[root@openeuler-server ~]# systemctl start docker
```

迁移完成后，磁盘空间正常了：

```bash
[root@openeuler-server ~]# df -Th
文件系统                                     类型      容量  已用  可用 已用% 挂载点
devtmpfs                                     devtmpfs  4.0M     0  4.0M    0% /dev
tmpfs                                        tmpfs      16G  8.0K   16G    1% /dev/shm
tmpfs                                        tmpfs     6.2G  660M  5.6G   11% /run
tmpfs                                        tmpfs     4.0M     0  4.0M    0% /sys/fs/cgroup
/dev/mapper/openeuler_openeuler--server-root ext4       41G   36G  2.9G   93% /
tmpfs                                        tmpfs      16G  4.0K   16G    1% /tmp
/dev/sda2                                    ext4      920M  312M  545M   37% /boot
/dev/sdb1                                    ext4       98G  7.0G   86G    8% /data
```

### 2.7 重新部署，终于成功

删除旧容器，重新启动：

```bash
[root@openeuler-server ~]# docker rm -f ivorysql
ivorysql
[root@openeuler-server ~]# docker run --name ivorysql -p 5432:5432 -p 1521:1521 \
>   -e IVORYSQL_PASSWORD=g4Bw#QPY4^t%87xTy -d \
>   registry.highgo.com/ivorysql/ivorysql:5.3-ubi8
90f5945502a072af760a738d2f962c73bcaadd91351fcbe0a5e80a03d14fceb5
[root@openeuler-server ~]#
```

等几秒后查看日志，这次终于看到 `ready to accept connections` 了：

```bash
[root@openeuler-server ~]# docker logs ivorysql --tail 20
2026-06-17 09:38:35.117 UTC [51] LOG:  shutting down
2026-06-17 09:38:35.118 UTC [51] LOG:  checkpoint starting: shutdown immediate
2026-06-17 09:38:35.125 UTC [51] LOG:  checkpoint complete: wrote 0 buffers (0.0%), wrote 3 SLRU buffers; 0 WAL file(s) added, 0 removed, 0 recycled; write=0.004 s, sync=0.001 s, total=0.009 s; sync files=2, longest=0.001 s, average=0.001 s; distance=0 kB, estimate=0 kB; lsn=0/1ED9B48, redo lsn=0/1ED9B48
2026-06-17 09:38:35.141 UTC [47] LOG:  database system is shut down
 done
server stopped

PostgreSQL init process complete; ready for start up.

2026-06-17 09:38:35.258 UTC [1] LOG:  starting PostgreSQL 18.3 (IvorySQL 5.3) on x86_64-pc-linux-gnu, compiled by gcc (GCC) 8.5.0 20210514 (Red Hat 8.5.0-28), 64-bit
2026-06-17 09:38:35.258 UTC [1] LOG:  listening on IPv4 address "0.0.0.0", port 5432
2026-06-17 09:38:35.258 UTC [1] LOG:  listening on IPv6 address "::", port 5432
2026-06-17 09:38:35.259 UTC [1] LOG:  listening on IPv4 address "0.0.0.0", port 1521
2026-06-17 09:38:35.259 UTC [1] LOG:  listening on IPv6 address "::", port 1521
2026-06-17 09:38:35.260 UTC [1] LOG:  listening on Unix socket "/tmp/.s.PGSQL.5432"
2026-06-17 09:38:35.262 UTC [1] LOG:  listening on Unix socket "/tmp/.s.PGSQL.1521"
2026-06-17 09:38:35.270 UTC [67] LOG:  database system was shut down at 2026-06-17 09:38:35 UTC
2026-06-17 09:38:35.276 UTC [1] LOG:  database system is ready to accept connections
2026-06-17 09:43:35.369 UTC [65] LOG:  checkpoint starting: time
2026-06-17 09:43:40.796 UTC [65] LOG:  checkpoint complete: wrote 54 buffers (0.3%), wrote 3 SLRU buffers; 0 WAL file(s) added, 0 removed, 0 recycled; write=5.419 s, sync=0.003 s, total=5.428 s; sync files=11, longest=0.002 s, average=0.001 s; distance=432 kB, estimate=432 kB; lsn=0/1F45EF0, redo lsn=0/1F45E98
[root@openeuler-server ~]#
```

`docker ps` 确认容器正常运行：

```bash
[root@openeuler-server ~]# docker ps
CONTAINER ID   IMAGE                                            COMMAND                  CREATED          STATUS          PORTS                                                                                            NAMES
90f5945502a0   registry.highgo.com/ivorysql/ivorysql:5.3-ubi8   "docker-entrypoint.s…"   12 minutes ago   Up 12 minutes   0.0.0.0:1521->1521/tcp, :::1521->1521/tcp, 0.0.0.0:5432->5432/tcp, :::5432->5432/tcp, 5866/tcp   ivorysql
[root@openeuler-server ~]#
```

再次测试连接：

```bash
[root@openeuler-server ~]# docker exec -it ivorysql psql -d ivorysql -U ivorysql
psql (18.3)
Type "help" for help.

ivorysql=#
```

查看版本确认：

```sql
ivorysql=# select version();
                                                        version                          
                               
-----------------------------------------------------------------------------------------
-------------------------------
 PostgreSQL 18.3 (IvorySQL 5.3) on x86_64-pc-linux-gnu, compiled by gcc (GCC) 8.5.0 20210
514 (Red Hat 8.5.0-28), 64-bit
(1 row)

ivorysql=#
```

> 💡 **小提示**：如果你用 Navicat 或 DBeaver 等外部工具连接，也需要等初始化完成。刚启动立刻连会报连接失败，建议等待 1-2 分钟再测试。

## 三、PostgreSQL 镜像也能拉

除了 IvorySQL，这个镜像仓库里也同步了 PostgreSQL 官方镜像。如果你需要在原生 PG 和 IvorySQL 之间做对比测试或者迁移评估，可以统一从这里拉：

```bash
docker pull registry.highgo.com/postgres/postgres:18.3-bookworm
docker pull registry.highgo.com/postgres/postgres:18.3-trixie
```

我在服务器上实测拉取 `18.3-bookworm`：

```bash
[root@openeuler-server ~]# docker pull registry.highgo.com/postgres/postgres:18.3-bookworm
18.3-bookworm: Pulling from postgres/postgres
67cf8384fcca: Pull complete 
047252d203fc: Pull complete 
285c515ff12e: Pull complete 
c04bac481cf9: Pull complete 
4d2f8983bdeb: Pull complete 
928cbc530e9b: Pull complete 
b7d7c0b1553c: Pull complete 
ef11daf91965: Pull complete 
5dab6177213d: Pull complete 
b73f5647695f: Pull complete 
9c1186127d05: Pull complete 
c73bb36f2399: Pull complete 
142af709c9ab: Pull complete 
Digest: sha256:1fa4bccc8246ee2ba9592895d804dcf767119e632999ef22d2b3355a93b627c3
Status: Downloaded newer image for registry.highgo.com/postgres/postgres:18.3-bookworm
registry.highgo.com/postgres/postgres:18.3-bookworm
[root@openeuler-server ~]#
```

目前可用的主要是带发行版后缀的标签，比如 `18.3-bookworm`、`18.3-trixie` 这些。

> ⚠️ **第四个坑：别凭感觉猜版本号**

我一开始想当然地以为能拉 `postgres:18.4` 或者 `postgres:15.18` 这种纯数字标签，结果：

```bash
[root@openeuler-server ~]# docker pull registry.highgo.com/postgres/postgres:18.4
Error response from daemon: unknown: artifact postgres/postgres:18.4 not found
[root@openeuler-server ~]# docker pull registry.highgo.com/postgres/postgres:15.18
Error response from daemon: unknown: artifact postgres/postgres:15.18 not found
```

所以拉之前最好去 `registry.highgo.com` 网页上确认一下有哪些 tag 可用，别凭感觉猜。

另外顺便提一句，如果你执行 `docker search postgres` 报错，那是 Docker 客户端默认去 Docker Hub 搜索被墙了，跟国内镜像仓库没关系。国内仓库本身不提供 `docker search` 功能。

## 四、不止是数据库内核

IvorySQL 的国内镜像仓库不只是提供了数据库内核镜像。围绕容器化部署场景，社区还在持续完善更多生态镜像：

| 类别 | 镜像 |
| --- | --- |
| **高可用部署** | `ivorysql/docker-compose-ha-cluster`、`ivorysql/k8s-ha-cluster` |
| **Kubernetes Operator** | `ivorysql/ivory-operator` |
| **空间数据扩展** | `ivorysql/postgis` |
| **管理工具** | `ivorysql/pgadmin` |
| **备份恢复** | `ivorysql/pgbackrest` |
| **连接池** | `ivorysql/pgbouncer` |
| **监控** | `ivorysql/postgres-exporter` |

这意味着你可以用一套镜像源，完成从"单机体验"到"生产级部署"的全链路支撑。不用在 Docker Hub、GitHub、各个官网之间来回跳转找资源。

如果你在实际使用中有其他镜像需求，也可以反馈给 IvorySQL 社区。

## 五、一点个人看法

镜像源上线这件事，单独看就是个基础设施优化。但放在 IvorySQL 的发展路径上来看，信号不太一样。

IvorySQL 5.3 是基于 PostgreSQL 18.3 构建的，2026 年 3 月 12 日正式发布。从版本迭代节奏来看，社区在同步 PG 最新内核方面跟得挺紧。而国内镜像源的上线，补上的是"用户触达"这一环——让想试的人能真正试起来，而不是卡在第一公里的网络问题上。

但镜像源只是起点。后续值得关注的点至少还有两个：

**第一，版本同步的时效性。** 镜像源能不能做到跟 Docker Hub 几乎同步更新？尤其像 PG 18.3 这种小版本修复，如果在镜像源里滞后几天，对于依赖最新安全补丁的用户来说就是隐患。

**第二，国产操作系统的原生支持。** 目前镜像基于 UBI8，在 x86 和 ARM 上跑都没问题。但如果在麒麟、统信这些国产 OS 上跑，会不会有依赖兼容性问题？这是很多政企用户真正关心的。

毕竟，技术文章最大的价值不是告诉别人"这么做是对的"，而是告诉别人"别像我那样做"。

> **作者：** ShunWah  
> **公众号：** "shunwah星辰数智社"主理人。  
>
> **持有认证：** OceanBase、MySQL、OpenGauss、崖山、金仓 KingBase、KaiwuDB、亚信 AntDBCA、翰高、GBase、Galaxybase、Neo4j、NebulaGraph、东方通 TongTech、TiDB 等多项权威认证。  
>
> **获奖经历：** 崖山 YashanDB YVP、浪潮 KaiwuDB MVP、墨天轮 MVP、金仓社区 KVA、TiDB 社区 MVA、NebulaGraph 社区之星、IFClub 星珩联盟·智库星系技术专家、ITPUB 技术专家，社区版主及布道师。在 OceanBase&墨天轮征文大赛、OpenGauss、TiDB、YashanDB、Kingbase、KWDB、Navicat 征文等赛事中多次斩获一、二、三等奖，原创技术文章常年被墨天轮、CSDN、ITPUB 等平台首页推荐。
>
> 📋 **作者注：**
>
> 本文围绕 IvorySQL 5.3 容器化部署展开的安装过程、问题分析与排查方案，均基于 openEuler 服务器 + Docker 容器环境实测整理。文中涉及的 `docker run` 命令截断报错、`psql` 客户端缺失、数据库连接拒绝、磁盘空间不足导致的 PANIC 崩溃等问题，均为本次部署过程中真实踩坑记录。
>
> 数据库运行环境复杂多样，操作系统版本、Docker 版本、磁盘分区方案、网络环境都会影响最终表现。本文方案仅作技术参考，不代表唯一标准解法。文中使用的密码示例 `PKsjj@112!!` 和 `g4Bw#QPY4^t%87xTy` 均为演示用途，实际生产环境请使用强密码并妥善保管。
>
> 以上内容为个人经验总结，不构成线上生产环境落地建议。

有问题欢迎在评论区留言，或者去 GitHub 上给 IvorySQL 社区提 issue。咱们下篇见。
