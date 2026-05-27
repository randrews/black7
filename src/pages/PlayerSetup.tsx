import PageFrame from '../components/PageFrame'
import PrimaryButton from '../components/PrimaryButton'

interface Props {
  onStart: () => void
}

export default function PlayerSetup({ onStart }: Props) {
  return (
    <PageFrame title="Player Setup" footer={<PrimaryButton onClick={onStart}>Start</PrimaryButton>}>
      {null}
    </PageFrame>
  )
}
