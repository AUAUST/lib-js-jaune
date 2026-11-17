# Agent friction

- npx engrenage: ran `npx engrenage planning --help` — devEngines requires pnpm and npx fails with EBADDEVENGINES; used `pnpm exec engrenage`
- gh label create: wrote a label description over 100 characters — GitHub rejects it with HTTP 422; shortened and retried
- engrenage barrels: expected public roles in domain entries — only roles both `public` and `collected`, and not `subpath`, are listed; read `planBarrels` in the engrenage repo
- engrenage structure options: looked for namespace, domain and mirror docs — no instruction lists them; read the generated `*Input.ts` types in the engrenage repo
