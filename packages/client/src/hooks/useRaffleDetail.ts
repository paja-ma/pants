import type { Address } from 'viem'
import { useReadContract } from 'wagmi'
import { RaffleDetail } from '@/types/raffle'
import raffle from '@/_generated/Raffle.json'

const useRaffleDetail = (address: Address): RaffleDetail => {
  const { data: title } = useReadContract({
    abi: raffle.abi,
    address: address,
    functionName: 'title',
  })

  const { data: description } = useReadContract({
    abi: raffle.abi,
    address: address,
    functionName: 'description',
  })

  const { data: numberOfWinners } = useReadContract({
    abi: raffle.abi,
    address: address,
    functionName: 'numberOfWinners',
  })
  console.debug('numberOfWinners:', typeof numberOfWinners)

  const { data: isClosed } = useReadContract({
    abi: raffle.abi,
    address: address,
    functionName: 'isClosed',
  })

  return {
    id: address,
    title: title as string | undefined,
    description: description as string | undefined,
    numberOfWinners: numberOfWinners as bigint | undefined,
    isClosed: isClosed as boolean | undefined,
  }
}

export default useRaffleDetail
