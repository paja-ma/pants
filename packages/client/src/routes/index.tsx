import { usePrivy } from '@privy-io/react-auth'
import { Navigate, Route, Routes } from 'react-router-dom'
import { LoginPage } from '../pages/LoginPage'
import { ProtectedRoute } from './ProtectedRoute'
import { HomePage } from '../pages/HomePage'
import { Layout } from '../components/Layout'
import { RaffleDetailPage } from '../pages/RaffleDetailPage'
import { CreateRafflePage } from '../pages/CreateRafflePage'
import { MyPage } from '../pages/MyPage'

export function AppRoutes() {
  const { authenticated } = usePrivy()

  return (
    <Routes>
      <Route
        path="/login"
        element={authenticated ? <Navigate to="/" replace /> : <LoginPage />}
      />
      <Route
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<HomePage />} />
        <Route path="/raffle/:id" element={<RaffleDetailPage />} />
        <Route path="/raffle/create" element={<CreateRafflePage />} />
        <Route path="/my" element={<MyPage />} />
      </Route>
    </Routes>
  )
}
