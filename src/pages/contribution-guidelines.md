# IvorySQL Contribution Guidelines

IvorySQL grows through contributions from **developers, testers, documentation writers, translators, community advocates, and users around the world**. This page first summarizes the main ways to participate in the community and the current incentive policy, then explains the practical workflow for code contributions.

## Ways to Contribute
The IvorySQL community believes that **open source should be approachable and that no contribution is too small**. You can participate in a way that matches your background and interests:

- **Code contributions**: kernel development, feature iteration, bug fixes, plugin development, ecosystem tool adaptation, regression tests, and code review.
- **Non-code contributions**: issue reports, documentation improvements, technical translation, community Q&A, online or offline talks, case studies, migration experience sharing, and community promotion.

If you are not ready to submit code yet, you can still make a meaningful contribution by **reproducing issues, clarifying requirements, improving docs, or helping other users in community discussions**.

## Incentive Policy
To encourage long-term participation, the IvorySQL community continues to improve how contributors are recognized and supported:

- **Recognition**: contributors may receive **community digital certificates** and be featured on the official <a href="https://www.ivorysql.org/contributors" target="_blank" rel="noopener noreferrer">contributor wall</a> to record their open-source footprint.
- **Mentorship**: the **"Lighthouse" mentoring model** helps contributors grow with technical guidance, one-on-one support, and code review feedback from experienced community members.
- **Community opportunities**: active contributors may receive speaking, sharing, or participation opportunities at community events such as **HOW** and other technical activities.
- **Annual incentives**: the community may select outstanding contributors for merchandise, public recognition, ecosystem exposure, and other collaboration opportunities.

Specific arrangements may evolve with community programs, but **sustained and valuable contributions are always taken seriously and recognized**.

If you are interested in code contributions but are not sure where to start, or if this is your first time contributing to IvorySQL, the guide below is meant to help you find a clear entry point and lower the barrier to participation.

## Code Contribution Guide
![process](/img/process_en.png)

### Getting Started
IvorySQL development and collaboration happen on **GitHub**. Before contributing, it is recommended that you:

- Have a GitHub account and be familiar with basic Git workflows.
- Fork the official repository and work on a dedicated branch in your own fork.
- Follow community discussions or mailing lists when relevant, especially for larger proposals.

Before submitting any code or documentation contributions, individual or corporate contributors are required to sign the **Contributor License Agreement (CLA)**. Please download, sign, and send the CLA to `cla@ivorysql.org`:

- [Individual contributor](/pdf/individual_cla.pdf)
- [Corporate contributor](/pdf/corporate_cla.pdf)

**Pull requests from contributors who have not signed the CLA cannot proceed to formal review.**

### Patch Submission
We recommend the following contribution flow:

1. Choose an entry point from GitHub issues, documentation gaps, community activities, or ecosystem needs.
2. For larger changes, discuss the proposal first in an issue, pull request thread, or mailing list to reduce rework.
3. Fork the repository and create a focused branch for one self-contained change.
4. Complete the implementation, tests, or documentation updates and review your own changes locally.
5. Submit a pull request to the official repository, or use issues and discussions for non-code contributions.
6. Respond to review feedback, push follow-up commits when needed, and iterate until the change is ready to merge.

### Coding and Testing Guidelines
To improve review quality and merge efficiency, we recommend the following:

- Split larger ideas into a series of small, self-contained commits whenever possible.
- Follow PostgreSQL coding conventions for C and C++ related changes.
- Run `pgindent` for C and Perl code when needed.
- Use `git diff --color` before submission to catch accidental whitespace-only changes.
- Add regression tests for new functionality whenever possible.
- At minimum, run **`make installcheck-world`** to ensure your changes do not introduce obvious regressions.

If you are unsure how to test or document a change, ask on the `ivorysql-hackers` mailing list and the community will do its best to help.

### Licensing of Contributions
If the contribution you are submitting is original work, you can assume it will be released as part of IvorySQL under the Apache License, Version 2.0.

If the contribution is not original work, you must clearly indicate the original license and ensure it is compatible with Apache License 2.0 terms. Proper attribution may also be required. In general, never remove an existing license header from third-party or previously licensed work unless you are absolutely certain it is appropriate to do so.

If you are unsure about the licensing implications of your contribution, please contact the community before submitting it.

### Changes Applicable to PostgreSQL Upstream
If your change touches functionality shared by PostgreSQL and IvorySQL, the community may ask you to forward-port or propose the change upstream. This helps reduce long-term divergence between the two projects and gives broadly useful changes access to wider review in the PostgreSQL ecosystem.

### Patch Review
A submitted **pull request with passing checks** is considered available for peer review. Review feedback helps ensure that changes are aligned with project quality standards, roadmap direction, and community expectations.

Possible review outcomes include requests for additional commits, changes in scope, testing improvements, or documentation updates. Please do not be discouraged by iteration; it is a normal part of open-source collaboration.

When feedback is delayed, it is fine to leave a polite comment on the pull request or ask for an update through the community channels.

### Direct Commits
Small non-functional fixes may occasionally be committed directly by core team members. Changes that affect behavior, testing, or product functionality should go through the pull request workflow.
