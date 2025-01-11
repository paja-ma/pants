import type { Address } from 'viem'
import { useWriteContract } from 'wagmi'
import raffle from '@/_generated/Raffle.json'

export function useRegisterRaffle() {
  const { writeContract } = useWriteContract()

  return {
    registerRaffle: (args: { raffleAddress: string; nickname: string }) =>
      writeContract({
        abi: raffle.abi,
        address: args.raffleAddress as Address,
        functionName: 'registerParticipant',
        args: [args.nickname],
      }),
  }
}
