import { z } from 'zod'

import { env } from '@/env'

const zTransactionLog = z
  .object({
    blockHash: z.string(),
    from: z.string(),
    to: z.string().nullable(),
    contractAddress: z.string().nullable(),
  })
  .array()

const getJoinedRaffle = async (raffleAddress: string) => {
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      'X-API-KEY': env.VITE_NODIT_API_KEY,
    },
    body: JSON.stringify({
      accountAddress: raffleAddress,
      fromBlock: 'earliest',
      toBlock: 'latest',
    }),
  }

  const res = await fetch(
    'https://web3.nodit.io/v1/ethereum/sepolia/blockchain/getTransactionsByAccount',
    options
  ).then((res) => res.json())

  const logs = zTransactionLog.parse(res['items'])
  // console.log(logs)

  return logs
    .filter((log) => log.to !== null && log.contractAddress === null)
    .map((log) => log.to as string)
    .reduce((acc: string[], val) => {
      if (!acc.includes(val)) acc.push(val)
      return acc
    }, [])
}

export default getJoinedRaffle
