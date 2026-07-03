# Agentic AI Architecture Interview Questions

## 1. How do you use Agentic AI in development?

### What it is

Agentic AI is an AI system that can reason over a task, use tools, inspect files, write code, run tests, and iterate toward a goal.

### Where I used it

I use it for code review, test generation, documentation, refactoring, debugging, boilerplate creation, and architecture exploration.

### Why I chose it

It speeds up repetitive engineering work and helps explore alternatives quickly.

### Trade-offs

AI can make incorrect assumptions, generate insecure code, or miss business context.

### Failure cases

Blindly accepting AI code can introduce bugs, license issues, secrets exposure, or architectural drift.

### How I monitored/debugged it

I require human review, tests, diffs, audit logs, limited tool access, and clear approval for risky actions.

## 2. How do you secure Agentic AI usage?

### What it is

Securing AI agents means controlling data access, tool permissions, network access, secrets, and generated changes.

### Where I used it

I apply least privilege, sandboxed execution, allowlisted commands, secret scanning, and review gates.

### Why I chose it

AI agents can access sensitive code and automate actions, so boundaries are necessary.

### Trade-offs

Strict controls reduce risk but may slow automation.

### Failure cases

An agent may leak secrets, run unsafe commands, expose customer data, or modify unrelated files.

### How I monitored/debugged it

I use audit trails, command logs, permission prompts, secret scanners, and pull request reviews.

## 3. How do you prevent data leakage with AI tools?

### What it is

Data leakage happens when sensitive source code, secrets, customer data, or internal documents are sent to an AI system without control.

### Where I used it

I classify data, redact secrets, restrict repositories, and avoid sharing production data in prompts.

### Why I chose it

It protects customer trust, compliance, and company IP.

### Trade-offs

Redaction and access limits can reduce AI context quality.

### Failure cases

Logs, `.env` files, tokens, or private customer data can be accidentally pasted or uploaded.

### How I monitored/debugged it

I use DLP checks, secret scanning, audit logs, prompt review policies, and restricted connectors.

## 4. How do you review AI-generated code?

### What it is

AI-generated code should be reviewed like code from a junior engineer: useful, but not automatically trusted.

### Where I used it

I review generated code for correctness, tests, security, error handling, and project conventions.

### Why I chose it

AI can be fast but not fully reliable.

### Trade-offs

Review takes time, but skipping review increases production risk.

### Failure cases

AI may invent APIs, ignore edge cases, over-engineer solutions, or introduce vulnerabilities.

### How I monitored/debugged it

I run tests, linting, type checks, security scans, compare diffs, and inspect runtime behavior.

## 5. How do you use AI safely in CI/CD?

### What it is

AI in CI/CD can summarize failures, suggest fixes, review changes, or generate release notes.

### Where I used it

I use AI for PR summaries, test failure explanation, documentation, and code review assistance.

### Why I chose it

It reduces developer feedback time and improves review quality.

### Trade-offs

AI should not deploy, approve, or merge critical changes without policy controls.

### Failure cases

AI may approve unsafe code, expose secrets in logs, or produce misleading failure summaries.

### How I monitored/debugged it

I keep human approval gates, audit all AI actions, limit token access, and block secret exposure.

## 6. What is prompt injection and how do you defend against it?

### What it is

Prompt injection is when untrusted text tries to manipulate an AI system into ignoring instructions or leaking data.

### Where I used it

I considered it in AI agents that read documents, tickets, emails, webpages, or repository content.

### Why I chose it

Agents often consume untrusted text, so instructions inside that text must not override system rules.

### Trade-offs

Strong defenses may reduce flexibility and require extra validation layers.

### Failure cases

An agent may reveal secrets, run unsafe tools, or trust malicious document instructions.

### How I monitored/debugged it

I use tool allowlists, instruction hierarchy, red-team tests, audit logs, and output review.

## 7. How do you control AI agent tool access?

### What it is

Tool access control decides which files, APIs, commands, networks, and actions an AI agent can use.

### Where I used it

I used read-only modes, approval prompts, sandboxing, and limited credentials for coding agents.

### Why I chose it

Agents can automate powerful actions, so least privilege is important.

### Trade-offs

More approvals reduce risk but can slow down workflows.

### Failure cases

Broad tool access can allow accidental deletion, data leaks, or unauthorized deployments.

### How I monitored/debugged it

I review command logs, file diffs, permission prompts, access scopes, and audit trails.

## 8. How do you evaluate AI-generated answers?

### What it is

AI evaluation checks whether outputs are correct, safe, complete, and useful for the intended task.

### Where I used it

I used evaluations for code suggestions, support answers, documentation generation, and test generation.

### Why I chose it

AI output quality varies, so evaluation prevents silent quality drift.

### Trade-offs

Good evals take time to design and maintain.

### Failure cases

Without evals, models can regress, hallucinate, or produce unsafe recommendations.

### How I monitored/debugged it

I use golden test cases, human review, automated checks, issue tracking, and failure analysis.

## 9. How do you use RAG securely?

### What it is

RAG retrieves relevant documents and gives them to an AI model as context.

### Where I used it

I used RAG for internal documentation search, support knowledge bases, and codebase Q&A.

### Why I chose it

It grounds answers in company-specific data instead of relying only on model memory.

### Trade-offs

Bad retrieval can produce incomplete or misleading answers.

### Failure cases

Wrong access control can retrieve documents the user should not see.

### How I monitored/debugged it

I inspect retrieved chunks, permissions, relevance scores, answer citations, and user feedback.

## 10. How do you prevent AI from exposing secrets?

### What it is

Secret protection ensures AI systems do not read, store, output, or transmit sensitive credentials.

### Where I used it

I used secret scanning, redaction, restricted files, and blocked environment variable access.

### Why I chose it

Secrets leaked through AI prompts or outputs can compromise systems.

### Trade-offs

Redaction can remove context the model might need.

### Failure cases

Agents may read `.env` files, logs, tokens, or customer data if access is not restricted.

### How I monitored/debugged it

I use secret scanners, output filters, access logs, DLP checks, and security reviews.

## 11. How do you use AI for code review safely?

### What it is

AI code review analyzes diffs for bugs, security issues, tests, and maintainability.

### Where I used it

I used AI as a second reviewer for pull requests, test gaps, and refactor suggestions.

### Why I chose it

It catches common issues and speeds up review preparation.

### Trade-offs

AI review can create false positives or miss domain-specific risks.

### Failure cases

Relying only on AI can allow subtle bugs or security issues into production.

### How I monitored/debugged it

I require human approval, compare AI findings with defects, and run tests/security scans.

## 12. How do you use AI with production data?

### What it is

Using AI with production data means applying strict controls before sensitive data reaches a model or agent.

### Where I used it

I use anonymized samples, redacted logs, synthetic data, or approved secure environments.

### Why I chose it

Production data can contain personal, financial, or confidential information.

### Trade-offs

Synthetic or redacted data may not capture every real-world edge case.

### Failure cases

Sending raw customer data to unmanaged AI tools can create compliance and privacy incidents.

### How I monitored/debugged it

I use data classification, approval workflows, audit logs, and privacy reviews.

## 13. How do you design human-in-the-loop AI workflows?

### What it is

Human-in-the-loop means AI proposes actions but humans approve important or risky decisions.

### Where I used it

I used it for code changes, deployments, customer communication, and security-sensitive automation.

### Why I chose it

It balances AI speed with human accountability.

### Trade-offs

Manual approval slows fully automated flows.

### Failure cases

No human gate for destructive actions can cause production damage.

### How I monitored/debugged it

I track approvals, rejected suggestions, action logs, and post-action outcomes.

## 14. How do you measure AI productivity impact?

### What it is

AI productivity measurement tracks whether AI improves delivery, quality, or support outcomes.

### Where I used it

I measured PR cycle time, documentation time, test coverage improvements, and review feedback.

### Why I chose it

AI adoption should be justified by useful outcomes, not novelty.

### Trade-offs

Productivity metrics can be misleading if they ignore quality and rework.

### Failure cases

AI may make developers faster at producing code but increase review burden or defect rate.

### How I monitored/debugged it

I compare cycle time, defect rate, review comments, escaped bugs, and developer feedback.

## 15. How do you govern AI usage in an engineering team?

### What it is

AI governance defines policies for approved tools, data handling, review, security, and auditability.

### Where I used it

I used team guidelines for code generation, prompt data, agent permissions, and PR review expectations.

### Why I chose it

It keeps AI usage safe, consistent, and aligned with company risk tolerance.

### Trade-offs

Too much governance can discourage useful experimentation.

### Failure cases

Without policy, teams may paste secrets, use unapproved tools, or merge unreviewed AI code.

### How I monitored/debugged it

I use training, tool access reviews, audit logs, security checks, and regular policy updates.
