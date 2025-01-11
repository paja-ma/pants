import styled from '@emotion/styled'
import { Outlet } from 'react-router-dom'
import { Header } from './Header'

export function Layout() {
  return (
    <LayoutWrapper>
      <Header />
      <Main>
        <Outlet />
      </Main>
    </LayoutWrapper>
  )
}

const LayoutWrapper = styled.div`
  min-height: 100vh;
  min-width: 100vw;
  width: 100%;
  background: #f8f9fa;
`

const Main = styled.main`
  width: 100%;
  display: flex;
  justify-content: center;
`
