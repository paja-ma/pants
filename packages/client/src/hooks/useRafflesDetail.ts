import type { Address } from 'viem'
import { useReadContracts } from 'wagmi'
import { RaffleDetail } from '@/types/raffle'
import raffle from '@/_generated/Raffle.json'
import type { Abi } from 'viem'

const useRafflesDetail = (addresses: Address[]): RaffleDetail[] => {
  const contracts = addresses.flatMap(
    (address) =>
      [
        {
          abi: raffle.abi as Abi,
          address,
          functionName: 'title',
        },
        {
          abi: raffle.abi as Abi,
          address,
          functionName: 'description',
        },
        {
          abi: raffle.abi as Abi,
          address,
          functionName: 'numberOfWinners',
        },
        {
          abi: raffle.abi as Abi,
          address,
          functionName: 'isClosed',
        },
      ] as const
  )

  const { data } = useReadContracts({
    contracts,
  })

  if (!data) return []

  return addresses.map((address, i) => {
    const baseIndex = i * 4
    return {
      id: address,
      title: data[baseIndex]?.result as string | undefined,
      description: data[baseIndex + 1]?.result as string | undefined,
      numberOfWinners: data[baseIndex + 2]?.result as bigint | undefined,
      isClosed: data[baseIndex + 3]?.result as boolean | undefined,
    }
  })
}

export default useRafflesDetail
