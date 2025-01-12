import type { Address } from 'viem'
import { useReadContract } from 'wagmi'
import raffleSystem from '@/_generated/RaffleSystem.json'

const useRaffleParticipants = (address: Address) => {
  const { data: participants } = useReadContract({
    abi: raffleSystem.abi,
    address: address,
    functionName: 'participants',
  })

  return participants
}

export default useRaffleParticipants
