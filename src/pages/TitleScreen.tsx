import styles from './TitleScreen.module.css'
import PrimaryButton from '../components/PrimaryButton'

interface Props {
  onNewGame: () => void
}

export default function TitleScreen({ onNewGame }: Props) {
  return (
    <div className={styles.frame}>
      <div className={styles.title}>
        <span className={styles.titleWord}>Black</span>
        <span className={styles.titleNumber}>7</span>
        <span className={styles.email}>ross.andrews@gmail.com</span>
      </div>
      <div className={styles.buttonRow}>
        <PrimaryButton onClick={onNewGame}>New Game</PrimaryButton>
      </div>
    </div>
  )
}
