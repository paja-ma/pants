import { env } from '@/env'

type GetTransactionsByAccountParams = {
  protocol: 'ethereum'
  network: 'mainnet' | 'sepolia' | 'holesky'
  address: string
  relation: 'from' | 'to' | 'both'
}

type Transaction = {
  transactionHash: string
  transactionIndex: string
  blockHash: string
  blockNumber: number
  from: string
  to: string
  value: string
  input: string
  functionSelector: string
  nonce: string
  gas: string
  gasPrice: string
  gasUsed: string
  cumulativeGasUsed: string
  contractAddress: string
  accessList: {
    address: string
    storageKeys: string[]
  }[]
  timeStamp?: number
}

export function getTransactionsByAccount(
  params: GetTransactionsByAccountParams
): Promise<{ items: Transaction[] }> {
  return fetch(
    `https://web3.nodit.io/v1/${params.protocol}/${params.network}/blockchain/getTransactionsByAccount?withDecodedInput=true`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-API-KEY': env.VITE_NODIT_API_KEY,
      },
      body: JSON.stringify({
        accountAddress: params.address,
        fromBlock: 'earliest',
        toBlock: 'latest',
        relation: params.relation,
      }),
    }
  ).then((res) => res.json())
}
