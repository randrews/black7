import styles from './PageFrame.module.css'

interface Props {
  title: string
  children: React.ReactNode
  footer?: React.ReactNode
  headerAction?: React.ReactNode
  headerActionLeft?: React.ReactNode
  overlay?: React.ReactNode
}

export default function PageFrame({ title, children, footer, headerAction, headerActionLeft, overlay }: Props) {
  return (
    <div className={styles.frame}>
      <header className={styles.header}>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.rule} role="separator" />
        {headerAction && <div className={styles.headerAction}>{headerAction}</div>}
        {headerActionLeft && <div className={styles.headerActionLeft}>{headerActionLeft}</div>}
      </header>
      <div className={styles.content}>
        {children}
      </div>
      {footer && <div className={styles.footer}>{footer}</div>}
      {overlay && <div className={styles.overlay}>{overlay}</div>}
    </div>
  )
}
