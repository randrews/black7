export function isIndividualScoreValid(n: number): boolean {
  return n % 5 === 0 && n <= 110
}

export function requiredRoundSum(playerCount: number): number {
  if (playerCount === 3) return -105
  if (playerCount >= 7) return -100
  return -110
}

export function isRoundScoreValid(scores: number[]): boolean {
  return scores.every(isIndividualScoreValid)
    && scores.reduce((a, b) => a + b, 0) === requiredRoundSum(scores.length)
}

// Returns totals[i][j] = cumulative score for player j after round i.
export function computeRunningTotals(rounds: number[][]): number[][] {
  const totals: number[][] = []
  for (let i = 0; i < rounds.length; i++) {
    if (i === 0) {
      totals.push([...rounds[0]])
    } else {
      totals.push(rounds[i].map((score, j) => totals[i - 1][j] + score))
    }
  }
  return totals
}

// Game ends when any player reaches -200 (checked against the most recent round's totals).
export function isGameOver(totals: number[][]): boolean {
  const last = totals[totals.length - 1]
  return last?.some((t: number) => t <= -200) ?? false
}
