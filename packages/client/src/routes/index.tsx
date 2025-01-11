import { usePrivy } from '@privy-io/react-auth'
import { Navigate, Route, Routes } from 'react-router-dom'
import { LoginPage } from '../pages/LoginPage'
import { ProtectedRoute } from './ProtectedRoute'
import { HomePage } from '../pages/HomePage'
import { Layout } from '../components/Layout'
import { RaffleDetailPage } from '../pages/RaffleDetailPage'
import { CreateRafflePage } from '../pages/CreateRafflePage'

export function AppRoutes() {
  const { authenticated } = usePrivy()

  return (
    <Routes>
      <Route
        path="/login"
        element={authenticated ? <Navigate to="/" replace /> : <LoginPage />}
      />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout>
              <HomePage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/raffle/:id"
        element={
          <ProtectedRoute>
            <Layout>
              <RaffleDetailPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/raffle/create"
        element={
          <ProtectedRoute>
            <Layout>
              <CreateRafflePage />
            </Layout>
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}
