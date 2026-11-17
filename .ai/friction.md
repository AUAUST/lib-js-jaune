# Agent friction

- npx engrenage: ran `npx engrenage planning --help` — devEngines requires pnpm and npx fails with EBADDEVENGINES; used `pnpm exec engrenage`
- gh label create: wrote a label description over 100 characters — GitHub rejects it with HTTP 422; shortened and retried
- engrenage barrels: expected public roles in domain entries — only roles both `public` and `collected`, and not `subpath`, are listed; read `planBarrels` in the engrenage repo
- engrenage structure options: looked for namespace, domain and mirror docs — no instruction lists them; read the generated `*Input.ts` types in the engrenage repo
- sed: deleted lines with a `\|` alternation — BSD sed on macOS ignores it; used `grep -vE` instead
- npm view: queried package metadata — devEngines requires pnpm and npm fails with EBADDEVENGINES; used `pnpm view` outside the repo
- zsh word splitting: passed refs as `$R` string — zsh does not split unquoted variables; used an array
- zsh word splitting: stored `pnpm exec engrenage planning issue create` in `$E` — zsh ran it as one command name; used a shell function
- pnpm pack: fetched a registry tarball with `pnpm pack culori` outside a package — fails without a package.json; used `curl` on `pnpm view … dist.tarball`
- planning skill: wrote plan `subIssues` `sections` as a comma string — `check` expects an array; the skill names the key without its type
- zsh glob in grep: `grep -rn … --include=*.ts` — zsh nomatch aborted the command; quoted the pattern
- engrenage planning issue claim: claimed a closed one-line issue to close it — publish rejected the body as a header and the claim left `Drafting` on GitHub; re-claimed, added a section, cleared `Blockers` by hand
- npx engrenage: ran planning --help through npx — devEngines requires pnpm; use pnpm exec
