import raffleData from '../mocks/raffles.json'
import { Raffle } from '../types/raffle'

export const raffleService = {
  async getRaffles(): Promise<Raffle[]> {
    // API 호출을 시뮬레이션하기 위한 인위적인 딜레이
    await new Promise((resolve) => setTimeout(resolve, 500))
    return raffleData.raffles
  },
}
