import { useState } from 'react'
import PageFrame from '../components/PageFrame'
import PrimaryButton from '../components/PrimaryButton'
import { isIndividualScoreValid, isRoundScoreValid } from '../game/scoring'
import { type GameState } from '../types'
import styles from './EnterScores.module.css'

interface Props {
  game: GameState
  onSubmit: (scores: number[]) => void
}

export default function EnterScores({ game, onSubmit }: Props) {
  const [values, setValues] = useState<string[]>(() => game.players.map(() => ''))

  function updateValue(i: number, v: string) {
    setValues(vs => vs.map((val, idx) => (idx === i ? v : val)))
  }

  const parsed = values.map(v => parseInt(v, 10))
  const fieldError = values.map((v, i) => v !== '' && (isNaN(parsed[i]) || !isIndividualScoreValid(parsed[i])))
  const allFilled = parsed.every(n => !isNaN(n))
  const sum = parsed.reduce((acc, n) => acc + (isNaN(n) ? 0 : n), 0)
  const canSubmit = allFilled && isRoundScoreValid(parsed)

  return (
    <PageFrame
      title="Enter Scores"
      footer={
        <PrimaryButton onClick={() => onSubmit(parsed)} disabled={!canSubmit}>
          Submit
        </PrimaryButton>
      }
    >
      {game.players.map((name, i) => (
        <div key={i} className={styles.row}>
          <span className={styles.name}>{name}</span>
          <input
            className={`${styles.scoreInput}${fieldError[i] ? ` ${styles.scoreInputError}` : ''}`}
            type="number"
            inputMode="numeric"
            value={values[i]}
            onChange={e => updateValue(i, e.target.value)}
          />
        </div>
      ))}
      <p className={`${styles.sumLine}${sum === -110 ? ` ${styles.sumValid}` : ''}`}>
        Sum: {sum} / −110
      </p>
    </PageFrame>
  )
}
