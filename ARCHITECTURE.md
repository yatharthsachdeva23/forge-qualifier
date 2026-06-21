# Architecture Design — Multi-Agent Kanban Team

This document outlines the multi-agent orchestration design implemented for the Forge Qualifier Sprint.

## Agent Roles & Workspace Division

We employ a two-agent setup working transparently in dedicated Slack channels:

1. **Hermes (The Brain / Orchestrator)**:
   - Receives tasks from the human user in `#sprint-main`.
   - Creates execution plans and breaks them down into individual tasks.
   - Dispatches tasks to the coding agent via `#agent-coder`.
   - Manages persistent memory across sessions.
   - Monitors execution state.

2. **OpenClaw (The Hands / Coder)**:
   - Listens to `#agent-coder` for instructions from Hermes or the human user.
   - Operates on the local workspace using system execution, file edits, and toolsets.
   - Performs code generation, installation of dependencies, and test executions.
   - Reports back to Slack using the structured status format: **What I Did / What's Left / What Needs Your Call**.

---

## Slack Channel Scheme

The communication flows entirely through the following channels:

| Channel | Purpose |
| :--- | :--- |
| `#sprint-main` | Human-to-Orchestrator channel. Triggering tasks and reviewing high-level progress. |
| `#agent-coder` | Agent-to-Agent task delegation. Where Hermes instructs OpenClaw and OpenClaw submits deliverables. |
| `#agent-log` | Raw logs and autonomous cron notifications. |
| `#ci-cd` | CI pipeline statuses (created for infrastructure compliance). |
| `#human-review` | Dedicated channel for human approvals. |

---

## Model Routing

To maximize efficiency and fit inside free tier constraints:
* **Hermes (Brain)**: Routed to `google/gemma-4-31b-it:free` via OpenRouter (large context, excellent structural planning capability).
* **OpenClaw (Hands)**: Routed to `cohere/north-mini-code:free` via OpenRouter (highly optimized for syntax generation and terminal operations, fast output times).
