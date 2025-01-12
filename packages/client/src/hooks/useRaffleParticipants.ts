import type { Address } from 'viem'
import { useReadContract } from 'wagmi'
import raffle from '@/_generated/Raffle.json'

const useRaffleParticipants = (address: Address) => {
  const { data: participants } = useReadContract({
    abi: raffle.abi,
    address: address,
    functionName: 'participants',
  })

  return participants
}

export default useRaffleParticipants
