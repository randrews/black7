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
  const [game, setGame] = useState<GameState | null>(loadGame)
  const [page, setPage] = useState<Page>(() => (game ? 'scoresheet' : 'title'))
  const [previousPlayers, setPreviousPlayers] = useState<string[] | undefined>(undefined)
  const [editingRound, setEditingRound] = useState<number | null>(null)

  function handleNewGame() {
    setPreviousPlayers(game?.players)
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

  function handleEditRound(i: number) {
    setEditingRound(i)
    setPage('enterscores')
  }

  function handleSubmitScores(scores: number[]) {
    const rounds = editingRound !== null
      ? game!.rounds.map((r, i) => (i === editingRound ? scores : r))
      : [...game!.rounds, scores]
    const updated: GameState = { ...game!, rounds }
    saveGame(updated)
    setGame(updated)
    setEditingRound(null)
    setPage('scoresheet')
  }

  if (page === 'title') return <TitleScreen onNewGame={handleNewGame} />
  if (page === 'setup') return <PlayerSetup onStart={handleStart} initialNames={previousPlayers} />
  if (page === 'scoresheet') return <ScoreSheet game={game!} onScoreRound={() => setPage('enterscores')} onNewGame={handleNewGame} onEditRound={handleEditRound} />
  if (page === 'enterscores') return <EnterScores game={game!} onSubmit={handleSubmitScores} onBack={() => { setEditingRound(null); setPage('scoresheet') }} initialValues={editingRound !== null ? game!.rounds[editingRound] : undefined} />
}
