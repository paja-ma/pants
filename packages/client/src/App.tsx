import './App.css'
import { PrivyProvider } from '@privy-io/react-auth'
import { WagmiProvider } from '@privy-io/wagmi'
import { BrowserRouter } from 'react-router-dom'
import { env } from './env'
import { AppRoutes } from './routes'
import { wagmiConfig } from './configs/wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { privyConfig } from './configs/privy.ts'

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
