import styles from './PageFrame.module.css'

interface Props {
  title: string
  children: React.ReactNode
  footer?: React.ReactNode
}

export default function PageFrame({ title, children, footer }: Props) {
  return (
    <div className={styles.frame}>
      <header className={styles.header}>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.rule} role="separator" />
      </header>
      <div className={styles.content}>
        {children}
      </div>
      {footer && <div className={styles.footer}>{footer}</div>}
    </div>
  )
}
