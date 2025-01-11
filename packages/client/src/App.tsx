import './App.css'
import { PrivyProvider } from '@privy-io/react-auth'
import { BrowserRouter } from 'react-router-dom'
import { env } from './env'
import { AppRoutes } from './routes'

function App() {
  return (
    <PrivyProvider
      appId={env.VITE_PRIVY_APP_ID}
      config={{
        embeddedWallets: {
          createOnLogin: 'users-without-wallets', // defaults to 'off'
        },
      }}
    >
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </PrivyProvider>
  )
}

export default App
