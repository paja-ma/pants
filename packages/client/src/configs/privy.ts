import type { PrivyClientConfig } from '@privy-io/react-auth'

export const privyConfig = {
  embeddedWallets: {
    createOnLogin: 'users-without-wallets' // defaults to 'off'
  }
} satisfies PrivyClientConfig
