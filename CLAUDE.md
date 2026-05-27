# Black 7

Scoring app for the card game **Last Panther**, hosted at black7.org.

## What this is

A mobile-first progressive web app (PWA) built with React and TypeScript. No backend — everything runs in the browser. Players use it to track scores during a game of Last Panther.

## Tech stack

- React (UI)
- TypeScript (strict mode)
- PWA (installable, offline-capable)
- No server, no API — browser-only

## Key constraints

- **Mobile-first**: design and test for phone-sized screens first; desktop is secondary
- **No backend**: all state lives in the browser (localStorage, sessionStorage, or in-memory)
- **Installable**: must meet PWA requirements (manifest, service worker, HTTPS)

## Running the app

```
npm install
npm run dev       # start dev server
npm run build     # production build
```

## Project conventions

- Components live in `src/components/`
- Game logic (scoring rules, state) lives in `src/game/`
- Types shared across the app live in `src/types.ts`
- Prefer small, focused components; keep game logic out of UI components
- No unnecessary comments — name things clearly instead