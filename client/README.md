# PrepVerse — client

The React + TypeScript frontend for PrepVerse, a placement-preparation
platform for engineering/CS/IT students. This package is the `client/`
half of the project; it expects a separately-running Spring Boot backend
at `server/`.

Currently wired to the backend: **Authentication** and **Profile**.
Resume, Jobs, Interview Prep, and AI Mock Interview are polished
"coming soon" previews — no fake data, no mock APIs.

## 1. Place the project

Copy (or unzip) this folder so it sits at:

```
PrepVerse/
  client/   ← this project
  server/   ← your existing Spring Boot backend (untouched)
```

## 2. Install dependencies

```bash
cd PrepVerse/client
npm install
```

## 3. Configure the environment

```bash
cp .env.example .env
```

`.env` should contain:

```
VITE_API_BASE_URL=http://localhost:8080/api/v1
```

Change the host/port only if your Spring Boot server runs elsewhere.
Never commit `.env` — it's already git-ignored.

## 4. Start the frontend

```bash
npm run dev
```

Vite will print a local URL (default `http://localhost:5173`).

## 5. Connect it to your Spring Boot backend

1. Start your backend separately: `PrepVerse/server` on `http://localhost:8080`.
2. Make sure `/api/v1/auth/register`, `/api/v1/auth/login`, and
   `/api/v1/profile` (GET/PUT) are reachable and CORS-enabled for
   `http://localhost:5173`.
3. Register an account from `/register`, sign in from `/login`, then
   complete your profile from `/profile`. The dashboard reads real data
   only — nothing is fabricated.

## 6. Build for production

```bash
npm run build
```

Output goes to `dist/`. Preview it locally with:

```bash
npm run preview
```

## Project structure

```
src/
  api/          Axios instance + auth/profile API calls
  components/   ui/, layout/, auth/, profile/, dashboard/
  context/      AuthContext, ThemeContext
  hooks/        useAuth, useTheme, useProfile
  routes/       ProtectedRoute
  pages/        one file per route
  types/        shared TypeScript types
  utils/        validation, profile completion, API error parsing
```

## Notes

- Dark and light themes are both fully designed (not simple inversions),
  persisted in `localStorage`, and default to the system preference on
  first visit.
- The JWT is attached to every authenticated request automatically via
  an Axios interceptor; a 401/403 response clears the session and
  redirects to `/login`.
- `skills` is sent/received as a single comma-separated string per the
  backend contract; the UI converts it to chips for editing.
- Profile completion percentage is calculated locally from real profile
  fields — it is never sourced from a fabricated backend metric.
