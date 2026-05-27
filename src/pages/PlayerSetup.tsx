import { useState } from 'react'
import PageFrame from '../components/PageFrame'
import PrimaryButton from '../components/PrimaryButton'
import styles from './PlayerSetup.module.css'

interface Props {
  onStart: (players: string[]) => void
}

function normalize(s: string) {
  return s.trim().replace(/\s+/g, ' ')
}

export default function PlayerSetup({ onStart }: Props) {
  const [names, setNames] = useState<string[]>(['', '', ''])

  function updateName(i: number, value: string) {
    setNames(n => n.map((v, idx) => (idx === i ? value : v)))
  }

  function addName() {
    setNames(n => [...n, ''])
  }

  function removeName(i: number) {
    setNames(n => n.filter((_, idx) => idx !== i))
  }

  const normalized = names.map(normalize)
  const counts = new Map<string, number>()
  normalized.forEach(n => counts.set(n, (counts.get(n) ?? 0) + 1))
  const fieldErrors = normalized.map(n => n === '' || (counts.get(n) ?? 0) > 1)
  const isValid = fieldErrors.every(e => !e)

  return (
    <PageFrame
      title="Player Setup"
      footer={
        <PrimaryButton onClick={() => onStart(names.map(n => n.trim()))} disabled={!isValid}>
          Start
        </PrimaryButton>
      }
    >
      {names.map((name, i) => (
        <div key={i} className={styles.row}>
          <input
            className={`${styles.nameInput}${fieldErrors[i] ? ` ${styles.nameInputError}` : ''}`}
            type="text"
            placeholder={`Player ${i + 1}`}
            value={name}
            onChange={e => updateName(i, e.target.value)}
          />
          {i >= 3 && (
            <button className={styles.removeBtn} onClick={() => removeName(i)}>
              ×
            </button>
          )}
        </div>
      ))}
      {names.length < 6 && (
        <div className={styles.addRow}>
          <button className={styles.addBtn} onClick={addName}>+</button>
        </div>
      )}
    </PageFrame>
  )
}
