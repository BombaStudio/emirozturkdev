# BRIEFING — 2026-06-29T16:30:45+03:00

## Mission
Redesign and build a professional, responsive, and brutalist portfolio website for Emir Öztürk, featuring automated background research of achievements and an ATS-friendly, print-ready CV page.

## 🔒 My Identity
- Archetype: teamwork_orchestrator
- Roles: orchestrator, user_liaison, human_reporter, successor
- Working directory: /mnt/hangar/emirozturkdev/.agents/orchestrator
- Original parent: parent
- Original parent conversation ID: c02fb2b6-0d27-448c-baa5-4bebc1b80018

## 🔒 My Workflow
- **Pattern**: Project Pattern
- **Scope document**: /mnt/hangar/emirozturkdev/PROJECT.md
1. **Decompose**: Decompose the requirements into milestones for both Implementation and E2E Testing Tracks, ensuring a target of 3-7 milestones.
2. **Dispatch & Execute**:
   - **Delegate (sub-orchestrator)**: For large milestones, spawn sub-orchestrators (or workers) to implement, verify, and report.
3. **On failure** (in this order):
   - Retry: nudge stuck agent or re-send task
   - Replace: spawn fresh agent with partial progress
   - Skip: proceed without (only if non-critical)
   - Redistribute: split stuck agent's remaining work
   - Redesign: re-partition decomposition
   - Escalate: report to parent (sub-orchestrators only, last resort)
4. **Succession**: Self-succeed at 16 spawns. Write handoff.md, spawn successor with parent conversation ID, and exit.
- **Work items**:
  1. Decompose project requirements and initialize PROJECT.md [in-progress]
  2. Implement E2E testing track and design test infrastructure [pending]
  3. Research and portfolio data enrichment [pending]
  4. Redesign homepage and portfolio pages [pending]
  5. Implement ATS-compliant CV/resume page [pending]
  6. Final milestone verification & adversarial coverage hardening [pending]
- **Current phase**: 1
- **Current focus**: Work item 5 (Implement ATS-compliant CV/resume page)

## 🔒 Key Constraints
- DISPATCH-ONLY: MUST delegate ALL work to subagents via invoke_subagent. Do NOT write code or solve problems directly.
- NEVER write, modify, or create source code files directly.
- NEVER run build/test commands yourself — require workers to do so.
- Verification is only complete when workers build/test successfully and layout matches.
- Zero tolerance for cheating/mocking.
- Forensic Auditor veto is absolute.
- Succession at 16 spawns.

## Current Parent
- Conversation ID: c02fb2b6-0d27-448c-baa5-4bebc1b80018
- Updated: not yet

## Key Decisions Made
- Chose Project Pattern with dual track (Implementation + E2E Testing).

## Team Roster
| Agent | Type | Work Item | Status | Conv ID |
|-------|------|-----------|--------|---------|
| worker_e2e_testing | teamwork_preview_worker | E2E test infra & cases | completed | 4e60a106-6b40-4083-8fed-e51bb105449f |
| explorer_research | teamwork_preview_explorer | Explore external background data | completed | 09eeed4c-8fac-4ca1-9f8a-2678bf1a0699 |
| worker_research_enrich | teamwork_preview_worker | Enrich data in portfolio.ts | completed | 9f5459c9-4712-4e58-bc46-154f01ea9d51 |
| worker_ui_and_resume | teamwork_preview_worker | Redesign pages & implement resume | completed | 259b0463-62e3-4031-bbc0-acfca744ef00 |
| worker_e2e_verification | teamwork_preview_worker | Verify E2E tests pass 100% | in-progress | 2662bfab-2a71-4e4b-b1f9-7390e25d40f1 |

## Succession Status
- Succession required: no
- Spawn count: 5 / 16
- Pending subagents: 2662bfab-2a71-4e4b-b1f9-7390e25d40f1
- Predecessor: none
- Successor: not yet spawned

## Active Timers
- Heartbeat cron: task-17
- Safety timer: none
- On succession: kill all timers before spawning successor
- On context truncation: run `manage_task(Action="list")` — re-create if missing

## Artifact Index
- /mnt/hangar/emirozturkdev/.agents/orchestrator/BRIEFING.md — Persistent working memory and state tracking
- /mnt/hangar/emirozturkdev/.agents/orchestrator/progress.md — Liveness signal and step progress log
