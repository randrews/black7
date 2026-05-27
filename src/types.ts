export type Page = 'title' | 'setup' | 'scoresheet' | 'enterscores'

export interface GameState {
  players: string[]
  rounds: number[][]   // rounds[i][j] = player j's score in round i
}
