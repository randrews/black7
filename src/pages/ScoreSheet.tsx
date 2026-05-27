import PageFrame from '../components/PageFrame'

interface Props {
  onScoreRound: () => void
  onNewGame: () => void
}

export default function ScoreSheet({ onScoreRound, onNewGame }: Props) {
  return (
    <PageFrame title="Score Sheet">
      <button onClick={onScoreRound}>Score Round</button>
      <button onClick={onNewGame} style={{ fontSize: '0.75em' }}>New Game</button>
    </PageFrame>
  )
}
