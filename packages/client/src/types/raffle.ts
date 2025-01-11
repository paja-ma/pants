export interface Raffle {
  id: string
  title?: string
  description?: string
  participants?: number
  numberOfWinners?: bigint
  creator?: {
    id: string
    name: string
    avatarUrl: string
  }
  imageUrl?: string
  isClosed?: boolean
  createdAt?: string
  endedAt?: string
}

export interface RaffleDetail extends Raffle {
  participantsCount?: number
  isCreator?: boolean
}
