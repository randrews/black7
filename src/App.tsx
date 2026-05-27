import { useState } from 'react'
import { type Page, type GameState } from './types'
import TitleScreen from './pages/TitleScreen'
import PlayerSetup from './pages/PlayerSetup'
import ScoreSheet from './pages/ScoreSheet'
import EnterScores from './pages/EnterScores'

const STORAGE_KEY = 'currentGame'

function loadGame(): GameState | null {
  const raw = localStorage.getItem(STORAGE_KEY)
  return raw ? (JSON.parse(raw) as GameState) : null
}

function saveGame(game: GameState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(game))
}

function clearGame() {
  localStorage.removeItem(STORAGE_KEY)
}

export default function App() {
  const [page, setPage] = useState<Page>(() =>
    loadGame() ? 'scoresheet' : 'title'
  )
  const [game, setGame] = useState<GameState | null>(() => loadGame())

  function handleNewGame() {
    clearGame()
    setGame(null)
    setPage('setup')
  }

  function handleStart(players: string[]) {
    const newGame: GameState = { players, rounds: [] }
    saveGame(newGame)
    setGame(newGame)
    setPage('scoresheet')
  }

  function handleSubmitScores() {
    setPage('scoresheet')
  }

  if (page === 'title') return <TitleScreen onNewGame={handleNewGame} />
  if (page === 'setup') return <PlayerSetup onStart={handleStart} />
  if (page === 'scoresheet') return <ScoreSheet onScoreRound={() => setPage('enterscores')} onNewGame={handleNewGame} />
  if (page === 'enterscores') return <EnterScores onSubmit={handleSubmitScores} />
}
