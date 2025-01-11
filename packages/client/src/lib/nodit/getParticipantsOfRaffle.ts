import { getTransactionsByAccount } from '@/lib/nodit/getTransactionsByAccount.ts'

export async function getParticipantAddressesOfRaffle(
  contractAddress: string
): Promise<Set<string>> {
  const { items } = await getTransactionsByAccount({
    protocol: 'ethereum',
    network: 'sepolia',
    address: contractAddress,
    relation: 'to',
  })
  // TODO: filter by functionSelector
  return new Set(items.map((item) => item.from))
}
