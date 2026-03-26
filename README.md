# PRPilot

**AI code reviews on every PR, automatically.**

PRPilot reviews your pull requests using Google Gemini AI — catches bugs, suggests improvements, and posts the review as a comment on your GitHub PR.

---

## How to run locally

### 1. Clone and install dependencies

```bash
git clone <repo-url> prpilot
cd prpilot
pnpm install
```

### 2. Set up environment variables

```bash
cp .env.example .env
# Fill in all values — see .env.example for details
```

### 3. Set up the database

```bash
# Make sure PostgreSQL is running, then:
pnpm db:push
```

### 4. Generate the Prisma client

```bash
pnpm db:generate
```

### 5. Start the dev server

```bash
pnpm dev
```

The app will be running at [http://localhost:3000](http://localhost:3000).

---

## How the webhook flow works

```
GitHub PR opened/updated
        │
        ▼
GitHub sends POST to /api/webhook/github
        │
        ▼
Verify HMAC-SHA256 signature
        │
        ▼
Filter: only handle pull_request (opened | synchronize)
        │
        ▼
Look up Repo in DB — skip if not found or inactive
        │
        ▼
Fetch PR diff via GitHub API (Octokit)
        │
        ▼
Send diff to Gemini AI for code review
        │
        ▼
Post review as comment on the PR via GitHub API
        │
        ▼
Save Review record to database (status: POSTED)
```

1. **A PR is opened or updated** on a connected repository.
2. **GitHub sends a webhook** (`pull_request` event) to the `/api/webhook/github` endpoint.
3. **Signature verification** ensures the payload is authentic (HMAC-SHA256).
4. **The diff is fetched** via the GitHub API using Octokit.
5. **Gemini AI analyzes the diff** and generates a structured code review (summary, issues, suggestions).
6. **The review is posted** as a comment on the PR via the GitHub API.
7. **A Review record** is saved to the database for the dashboard.

---

## Tech stack

- **Runtime**: Node.js 20, TypeScript (strict)
- **Framework**: Next.js 14 (App Router)
- **Database**: PostgreSQL via Prisma ORM
- **Auth**: NextAuth.js with GitHub OAuth
- **AI**: Google Gemini (`@google/generative-ai`)
- **GitHub**: Octokit (`@octokit/rest`)
- **Styling**: Tailwind CSS
- **Package manager**: pnpm

---

## Project structure

```
prpilot/
├── apps/
│   └── web/                        ← Next.js app
│       ├── app/
│       │   ├── layout.tsx
│       │   ├── page.tsx             ← landing page
│       │   ├── dashboard/
│       │   │   └── page.tsx         ← review history dashboard
│       │   └── api/
│       │       ├── auth/[...nextauth]/route.ts
│       │       └── webhook/github/route.ts
│       ├── components/
│       │   ├── ReviewCard.tsx
│       │   └── RepoList.tsx
│       ├── lib/
│       │   ├── prisma.ts
│       │   ├── github.ts
│       │   ├── ai.ts
│       │   └── auth.ts
│       ├── tailwind.config.ts
│       └── next.config.ts
├── prisma/
│   └── schema.prisma
├── .env.example
├── pnpm-workspace.yaml
└── package.json
```

testing pr review 
another pr