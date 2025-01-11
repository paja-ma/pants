export interface Raffle {
  id: string
  title: string
  description: string
  imageUrl?: string
  isEnded: boolean
  createdAt: string
  endedAt?: string
}
