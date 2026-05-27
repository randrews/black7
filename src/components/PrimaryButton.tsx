import styles from './PrimaryButton.module.css'

interface Props {
  onClick: () => void
  children: React.ReactNode
  disabled?: boolean
}

export default function PrimaryButton({ onClick, children, disabled }: Props) {
  return (
    <button className={styles.button} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )
}
