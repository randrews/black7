import { useState } from 'react'
import PageFrame from '../components/PageFrame'
import PrimaryButton from '../components/PrimaryButton'
import HelpModal from '../components/HelpModal'
import { isIndividualScoreValid, isRoundScoreValid } from '../game/scoring'
import { type GameState } from '../types'
import styles from './EnterScores.module.css'
import sharedStyles from '../styles/shared.module.css'

interface Props {
  game: GameState
  onSubmit: (scores: number[]) => void
  onBack: () => void
  initialValues?: number[]
}

export default function EnterScores({ game, onSubmit, onBack, initialValues }: Props) {
  const [values, setValues] = useState<string[]>(() =>
    game.players.map((_, i) => initialValues ? String(initialValues[i]) : '')
  )
  const [showHelp, setShowHelp] = useState(false)

  function updateValue(i: number, v: string) {
    setValues(vs => vs.map((val, idx) => (idx === i ? v : val)))
  }

  function toggleSign(i: number) {
    setValues(vs => vs.map((val, idx) => {
      if (idx !== i) return val
      const digits = val.startsWith('-') ? val.slice(1) : val
      if (!digits) return val
      return val.startsWith('-') ? digits : '-' + digits
    }))
  }

  const parsed = values.map(v => parseInt(v, 10))
  const fieldError = values.map((v, i) => v !== '' && (isNaN(parsed[i]) || !isIndividualScoreValid(parsed[i])))
  const allFilled = parsed.every(n => !isNaN(n))
  const sum = parsed.reduce((acc, n) => acc + (isNaN(n) ? 0 : n), 0)
  const canSubmit = allFilled && isRoundScoreValid(parsed)

  return (
    <PageFrame
      title="Enter Scores"
      headerActionLeft={<button className={sharedStyles.helpBtn} onClick={onBack}>←</button>}
      headerAction={<button className={sharedStyles.helpBtn} onClick={() => setShowHelp(true)}>?</button>}
      overlay={showHelp ? <HelpModal onClose={() => setShowHelp(false)} /> : undefined}
      footer={
        <PrimaryButton onClick={() => onSubmit(parsed)} disabled={!canSubmit}>
          Submit
        </PrimaryButton>
      }
    >
      {game.players.map((name, i) => (
        <div key={i} className={styles.row}>
          <span className={styles.name}>{name}</span>
          <button type="button" className={styles.signToggle} onClick={() => toggleSign(i)}>
            {values[i].startsWith('-') ? '−' : '+'}
          </button>
          <input
            className={`${styles.scoreInput}${fieldError[i] ? ` ${styles.scoreInputError}` : ''}`}
            type="text"
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
