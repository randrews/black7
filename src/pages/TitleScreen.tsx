interface Props {
  onNewGame: () => void
}

export default function TitleScreen({ onNewGame }: Props) {
  return (
    <div>
      <h1>Black 7</h1>
      <button onClick={onNewGame}>New Game</button>
    </div>
  )
}
