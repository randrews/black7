interface Props {
  onSubmit: () => void
}

export default function EnterScores({ onSubmit }: Props) {
  return (
    <div>
      <h1>Enter Scores</h1>
      <button onClick={onSubmit}>Submit</button>
    </div>
  )
}
