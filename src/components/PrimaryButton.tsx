import styles from './PrimaryButton.module.css'

interface Props {
  onClick: () => void
  children: React.ReactNode
}

export default function PrimaryButton({ onClick, children }: Props) {
  return (
    <button className={styles.button} onClick={onClick}>
      {children}
    </button>
  )
}
