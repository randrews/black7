import styles from './HelpModal.module.css'

interface Props {
  onClose: () => void
}

export default function HelpModal({ onClose }: Props) {
  return (
    <div className={styles.box}>
      <div className={styles.body}>
          <h3>Setup</h3>
          <ul>
              <li>3 players, remove all 1s and 2s</li>
              <li>4-6 players, use everything</li>
              <li>7-8 players, remove non-yellow 2s</li>
          </ul>
          <h3>Scoring</h3>
          <ul>
              <li>Gold good! Each gold card is +5 points</li>
              <li>Red bad! Each bad card -10 points</li>
              <li>Black seven <em>very</em> bad: -50 points each</li>
              <li>Last trick very good: +50 points</li>
          </ul>
      </div>
      <button className={styles.dismiss} onClick={onClose}>Got it</button>
    </div>
  )
}
