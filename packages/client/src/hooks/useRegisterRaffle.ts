import type { Address } from 'viem'
import raffleSystem from '@/_generated/RaffleSystem.json'
import { useSmartWallets } from '@privy-io/react-auth/smart-wallets'

export function useRegisterRaffle() {
  const { client } = useSmartWallets()

  return {
    registerRaffle: async (args: {
      raffleAddress: string
      title: string
      description: string
      numberOfWinners: number
    }) => {
      const res = await client?.writeContract({
        abi: raffleSystem.abi,
        address: '0xcd465BB7119588Cac7A5EE8503F841594ACeE691' as Address,
        functionName: 'createRaffle',
        args: [args.title, args.description, args.numberOfWinners, null],
      })

      console.log('res:', res)
    },
  }
}
