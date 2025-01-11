import { RaffleDetail } from '@/types/raffle'
import { useReadContract } from 'wagmi'
import { deployArgs } from './deploy'

const useRaffleDetail = (address: `0x${string}`): RaffleDetail => {
  const { data: title } = useReadContract({
    abi: deployArgs.abi,
    address,
    functionName: 'title',
  })

  const { data: description } = useReadContract({
    abi: deployArgs.abi,
    address,
    functionName: 'description',
  })

  const { data: numberOfWinners } = useReadContract({
    abi: deployArgs.abi,
    address,
    functionName: 'numberOfWinners',
  })
  console.debug('numberOfWinners:', typeof numberOfWinners)

  const { data: isClosed } = useReadContract({
    abi: deployArgs.abi,
    address,
    functionName: 'isClosed',
  })

  return {
    id: address,
    title: title as string,
    description: description as string,
    numberOfWinners: (numberOfWinners as bigint).toString(),
    isClosed: isClosed as boolean,
  }
}

export default useRaffleDetail
