export interface Raffle {
  id: string
  title: string
  description: string
  imageUrl?: string
  isEnded: boolean
  createdAt: string
  endedAt?: string
  creatorId?: string
}

export interface RaffleDetail extends Raffle {
  participantsCount?: number
  isCreator?: boolean
}
