import { usePrivy } from '@privy-io/react-auth'
import { Navigate } from 'react-router-dom'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { authenticated } = usePrivy()

  if (!authenticated) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}
