import { createConfig } from '@privy-io/wagmi'
import { http } from 'wagmi'
import { sepolia } from 'wagmi/chains'

export const wagmiConfig = createConfig({
  chains: [sepolia],
  transports: {
    [sepolia.id]: http(),
  },
})
