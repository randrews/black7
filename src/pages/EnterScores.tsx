import PageFrame from '../components/PageFrame'

interface Props {
  onSubmit: () => void
}

export default function EnterScores({ onSubmit }: Props) {
  return (
    <PageFrame title="Enter Scores">
      <button onClick={onSubmit}>Submit</button>
    </PageFrame>
  )
}
