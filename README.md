# Forge Sprint Qualifier Challenge

This repository contains the multi-agent web scraping workflow for the Forge Sprint Qualifier.

## Agents Involved
- **Hermes Orchestrator**: Coordinates tasks, updates plans, and assigns work.
- **OpenClaw Coder**: Receives tasks, writes code, executes scripts locally, and posts structured status updates.

## Workflow
1. Hermes triggers the custom `web-scraper` skill.
2. Hermes instructs OpenClaw to crawl page titles for a set of URLs.
3. OpenClaw writes and runs `scraper.py` and outputs the titles to `results.json`.
4. A human reviewer requests a change (e.g. scrape `<h1>` text), and OpenClaw iterates on the code.
