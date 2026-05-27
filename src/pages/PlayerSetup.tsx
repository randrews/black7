interface Props {
  onStart: () => void
}

export default function PlayerSetup({ onStart }: Props) {
  return (
    <div>
      <h1>Player Setup</h1>
      <button onClick={onStart}>Start</button>
    </div>
  )
}
