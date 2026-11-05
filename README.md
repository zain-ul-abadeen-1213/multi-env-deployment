# Multi-Environment Deployment with GitHub Actions

One GitHub Actions workflow that deploys a sample application to three environments — **Dev, QA and Production** — using the **build once, deploy many** principle: the application is built and tested a single time, and that exact same artifact is promoted to every environment, so what QA tested is byte-for-byte what reaches production.

## How it works

```
git push (develop) ──► build ──► deploy to Dev        (automatic)
git push (main)    ──► build ──► deploy to QA         (manual approval)
                            └──► deploy to Production (manual approval)
```

- **GitHub Environments** (`dev`, `qa`, `production`) hold per-environment secrets and protection rules. QA and Production require a **required reviewer** approval before any deployment runs — every approval is recorded in the run history (who approved, and when).
- Deployments run on a **self-hosted GitHub Actions runner** and reach the target machine over **SSH** (`appleboy/ssh-action`), one dedicated OS account per environment.
- A **concurrency group** guarantees only one deployment per branch at a time, and an in-progress deployment is never cancelled mid-way.
- Secrets live only in GitHub Environment secrets — never in the repository — and are masked (`***`) in all logs.

## Repository contents

```
├── .github/workflows/deploy.yml   # the pipeline (build + 3 deploy jobs)
├── app.js                         # sample application
├── test.js                        # smoke test run in the build job
└── package.json
```

## Environments

| Environment | Trigger | Approval | Target account |
|---|---|---|---|
| dev | push to `develop` | none (automatic) | `deploydev` |
| qa | push to `main` | required reviewer | `deployqa` |
| production | after QA succeeds | required reviewer | `deployprod` |

Each deployment extracts the artifact into the environment account's home directory and writes a `DEPLOYED.txt` stamp with the deployed version, which makes verification trivial: the version stamp must be identical in all three environments.

## Screenshots

<!-- Actions run graph and the approval ("Review deployments") step are added here after the first verified runs. -->

## Author

**Zain Ul Abdin** — Founder, **Zain Tech Automation Solutions**, Karachi, Pakistan
GitHub: [@zain-ul-abadeen-1213](https://github.com/zain-ul-abadeen-1213)
