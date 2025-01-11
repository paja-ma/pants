import { usePrivy } from '@privy-io/react-auth'
import { Route, Routes } from 'react-router-dom'
import { LoginPage } from '../pages/LoginPage'
import { HomePage } from '../pages/HomePage'
import { Layout } from '../components/Layout'
import { RaffleDetailPage } from '../pages/RaffleDetailPage'
import { CreateRafflePage } from '../pages/CreateRafflePage'
import { MyPage } from '../pages/MyPage'

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<ProtectedLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/raffle/:id" element={<RaffleDetailPage />} />
        <Route path="/raffle/create" element={<CreateRafflePage />} />
        <Route path="/my" element={<MyPage />} />
      </Route>
    </Routes>
  )
}

function ProtectedLayout() {
  const { authenticated } = usePrivy()

  if (!authenticated) {
    return <LoginPage />
  }

  return <Layout />
}
