import styled from '@emotion/styled'
import { Header } from './Header'

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <LayoutWrapper>
      <Header />
      <Main>{children}</Main>
    </LayoutWrapper>
  )
}

const LayoutWrapper = styled.div`
  min-height: 100vh;
  width: 100%;
  background: #f8f9fa;
`

const Main = styled.main`
  width: 100%;
  display: flex;
  justify-content: center;
`
