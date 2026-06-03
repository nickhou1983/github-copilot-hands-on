# GitHub Copilot Hands-on Lab — Project Instructions

## Project Overview

This is a **training/workshop repository** for GitHub Copilot. It contains hands-on lab documents (Markdown), demo scripts, and example code to teach participants how to use GitHub Copilot effectively.

## Structure

- `github-copilot-lab/lab/cn/` — Chinese lab documents
- `github-copilot-lab/lab/en/` — English lab documents
- `github-copilot-scenario-roles/` — Scenario-based demos (IaC, DB, UI, Figma)
- `scripts/` — Utility scripts (Node.js, pptxgenjs)

## Conventions

- **Bilingual**: Lab content exists in both Chinese (`cn/`) and English (`en/`). Keep both in sync when editing.
- **Markdown format**: Use clear heading hierarchy (`##` for sections, `####` for steps). Number lab steps sequentially.
- **Code examples**: Must be concise, self-contained, and include brief comments explaining key lines.
- **Runtime**: Node.js >= 22. Dependencies include Playwright, pptxgenjs, sharp, axios.
- **Response language**: Match the language of the file being edited (Chinese for `cn/`, English for `en/`).

## When Uncertain

- Ask before modifying lab step numbering or structure across multiple files.
- Do not invent tool features — only reference documented GitHub Copilot capabilities.
- Prefer linking to official docs over duplicating content.

