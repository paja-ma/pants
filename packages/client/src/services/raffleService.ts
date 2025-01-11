import raffleData from '../mocks/raffles.json'
import { MOCK_USER_ID } from '../mocks/constants'
import { Raffle, RaffleDetail } from '../types/raffle'

export const raffleService = {
  async getRaffles(): Promise<Raffle[]> {
    await new Promise((resolve) => setTimeout(resolve, 500))
    return raffleData.raffles
  },

  async getRaffleDetail(id: string): Promise<RaffleDetail> {
    await new Promise((resolve) => setTimeout(resolve, 500))
    const raffle = raffleData.raffles.find((r) => r.id === id)
    if (!raffle) throw new Error('Raffle not found')

    return {
      ...raffle,
      isCreator: raffle.creator.id === MOCK_USER_ID,
      participantsCount: 42, // 목업 데이터
    }
  },

  async endRaffle(id: string): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 500))
    console.log('Ending raffle:', id)
  },
}
