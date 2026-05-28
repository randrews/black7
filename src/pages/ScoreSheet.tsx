import { Fragment, useState, type CSSProperties } from 'react'
import { type GameState } from '../types'
import { computeRunningTotals, isGameOver } from '../game/scoring'
import PageFrame from '../components/PageFrame'
import PrimaryButton from '../components/PrimaryButton'
import styles from './ScoreSheet.module.css'

interface Props {
  game: GameState
  onScoreRound: () => void
  onNewGame: () => void
}

export default function ScoreSheet({ game, onScoreRound, onNewGame }: Props) {
  const [confirmingNewGame, setConfirmingNewGame] = useState(false)

  const totals = computeRunningTotals(game.rounds)
  const gameOver = isGameOver(totals)

  const newGameButton = (
    <button className={styles.newGameBtn} onClick={() => setConfirmingNewGame(true)}>
      New Game
    </button>
  )

  const confirmOverlay = (
    <div className={styles.confirmContent}>
      <p className={styles.confirmText}>End this game?</p>
      <div className={styles.confirmButtons}>
        <button className={styles.cancelBtn} onClick={() => setConfirmingNewGame(false)}>
          Cancel
        </button>
        <button className={styles.endGameBtn} onClick={onNewGame}>
          End Game
        </button>
      </div>
    </div>
  )

  return (
    <PageFrame
      title="Score Sheet"
      headerAction={newGameButton}
      overlay={confirmingNewGame ? confirmOverlay : undefined}
      footer={<PrimaryButton onClick={onScoreRound} disabled={gameOver}>Score Round</PrimaryButton>}
    >
      <div className={styles.tableWrapper}>
        <div
          className={styles.grid}
          style={{ '--player-count': game.players.length } as CSSProperties}
        >
          <div className={styles.labelCell} />
          {game.players.map((name, j) => (
            <div key={j} className={styles.headerCell}>{name}</div>
          ))}

          {game.rounds.map((roundScores, i) => (
            <Fragment key={i}>
              <div className={styles.labelCell}>Round {i + 1}</div>
              {roundScores.map((score, j) => (
                <div key={j} className={styles.scoreCell}>{score}</div>
              ))}

              {i > 0 && (
                <>
                  <div className={`${styles.labelCell} ${styles.divider}`} />
                  {totals[i].map((total, j) => (
                    <div key={j} className={`${styles.totalCell} ${styles.divider}`}>{total}</div>
                  ))}
                </>
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </PageFrame>
  )
}