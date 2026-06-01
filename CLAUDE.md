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

## Pages and navigation

Navigation is a simple `useState<Page>` state machine in `App.tsx` — no router.

| Page | Key | Description |
|------|-----|-------------|
| Title screen | `'title'` | Shown on first load (no saved game). "New Game" button navigates to setup. |
| Player setup | `'setup'` | Enter 3–8 player names, then "Start" saves the game and goes to scoresheet. |
| Score sheet | `'scoresheet'` | Shows per-round scores and running totals. Small red "New Game" button (top-right) opens a confirmation dialog before clearing state and going to setup. "Score Round" (footer) → enter scores. |
| Enter scores | `'enterscores'` | Form to enter each player's score for the round. "Submit" → back to scoresheet. |

On mount, `App.tsx` checks `localStorage` for a saved game and jumps straight to `'scoresheet'` if found.

## Game rules

- Each round every player scores some points; scores must sum to **-95** (3 players), **-110** (4–6 players), or **-100** (7–8 players)
- Each player starts at 0; the game ends when any player reaches **-200**

## Data model

```ts
type Page = 'title' | 'setup' | 'scoresheet' | 'enterscores'

interface GameState {
  players: string[]      // display names, edge-trimmed
  rounds: number[][]     // rounds[i][j] = player j's score in round i
}
```

Persisted to `localStorage` under the key `currentGame`. No game history yet — only one game at a time.

## Scoring logic

Pure functions live in `src/game/scoring.ts` (no React imports):

- `computeRunningTotals(rounds)` — returns `totals[i][j]`, the cumulative score for player `j` after round `i`
- `isGameOver(totals)` — true if any player's total in the last round is ≤ -200

## Design system

### Layout

- Full-window gradient background: `linear-gradient(to bottom, #a8d5e8, #4a9e6a)` on `body`
- All pages have a rounded card (`border-radius: 2rem`, `border: 2px solid black`) inset `1rem` from window edges
- **Title screen**: card background is transparent (gradient shows through)
- **All other pages**: card background is parchment `#f5f0e4` via `PageFrame`

### PageFrame component

Shared layout for non-title pages. Props: `title`, `children`, `footer?`, `headerAction?`, `overlay?`. Renders:
- Fixed-position card with header (h1 + diamond rule divider), scrollable content area, optional sticky footer
- `headerAction` — rendered absolutely in the top-right of the header (used for the scoresheet's "New Game" button)
- `overlay` — rendered `position: fixed; inset: 0` over the full viewport with a dim backdrop; the caller provides the dialog box content centered inside it

Diamond rule: CSS `::before` pseudo-element with `content: '◆'` centered on a thin border line. Color `#c8b99a`.

### Colors

| Token | Value | Usage |
|-------|-------|-------|
| Blue | `#a8d5e8` | Primary button background, gradient top |
| Green | `#4a9e6a` | Gradient bottom |
| Parchment | `#f5f0e4` | Page card background |
| Parchment border | `#c8b99a` | Input borders, diamond rule |
| Error red | `#c0392b` | Invalid field border |
| Error bg | `#fff5f5` | Invalid field background |
| Remove red | `#d94f4f` | Remove-player button background |

### Buttons

Shadow and press animation are on the global `button` selector in `src/index.css` — every `<button>` gets them automatically.

- **Resting shadow**: `0 4px 12px rgba(0,0,0,0.25)`
- **Pressed shadow**: `0 2px 6px rgba(0,0,0,0.2)` via `button:active:not(:disabled)`
- **`PrimaryButton`**: full-width, blue, `border-radius: 1rem`, `font-size: 1.25rem`, `font-weight: 600`. Accepts `disabled` prop — disabled state: `opacity: 0.45`, no shadow, `cursor: not-allowed`, no press animation.
- **Round buttons**: circular, `border: none`. Add button: `3rem`, blue. Remove button: `2.5rem`, red.

### Typography

- `font-family: sans-serif` everywhere (a real web font will be chosen later)
- Global `button` base: `min-height: 2.75rem`, `font-size: 1rem`, `font-family: inherit`