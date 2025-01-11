import { BrowserRouter } from 'react-router-dom'
import { PrivyProvider } from '@privy-io/react-auth'
import { WagmiProvider } from '@privy-io/wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { privyConfig } from '@/configs/privy.ts'
import { wagmiConfig } from '@/configs/wagmi'
import { env } from '@/env'
import { AppRoutes } from '@/routes'
import '@/styles/global.css'
import './App.css'

const queryClient = new QueryClient()

function App() {
  return (
    <BrowserRouter>
      <PrivyProvider appId={env.VITE_PRIVY_APP_ID} config={privyConfig}>
        <QueryClientProvider client={queryClient}>
          <WagmiProvider config={wagmiConfig}>
            <AppRoutes />
          </WagmiProvider>
        </QueryClientProvider>
      </PrivyProvider>
    </BrowserRouter>
  )
}

export default App
