interface Props {
  onScoreRound: () => void
  onNewGame: () => void
}

export default function ScoreSheet({ onScoreRound, onNewGame }: Props) {
  return (
    <div>
      <h1>Score Sheet</h1>
      <button onClick={onScoreRound}>Score Round</button>
      <button onClick={onNewGame} style={{ fontSize: '0.75em' }}>New Game</button>
    </div>
  )
}
