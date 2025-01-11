import './App.css'
import { PrivyProvider } from '@privy-io/react-auth'
import { BrowserRouter } from 'react-router-dom'
import { env } from './env'
import { AppRoutes } from './routes'
import { WagmiProvider } from 'wagmi'
import { wagmiConfig } from './configs/wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { privyConfig } from './configs/privy.ts'

const queryClient = new QueryClient()

function App() {
  return (
    <PrivyProvider appId={env.VITE_PRIVY_APP_ID} config={privyConfig}>
      <BrowserRouter>
        <WagmiProvider config={wagmiConfig}>
          <QueryClientProvider client={queryClient}>
            <AppRoutes />
          </QueryClientProvider>
        </WagmiProvider>
      </BrowserRouter>
    </PrivyProvider>
  )
}

export default App
