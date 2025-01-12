import { usePrivy } from '@privy-io/react-auth'
import { Link, NavLink, Outlet, Route, Routes } from 'react-router-dom'
import { LoginPage } from '../pages/LoginPage'
import { HomePage } from '../pages/HomePage'
import { Layout } from '../components/Layout'
import { RaffleDetailPage } from '../pages/RaffleDetailPage'
import { CreateRafflePage } from '../pages/CreateRafflePage'
import { MyPage } from '../pages/MyPage'
import { SplashPage } from '@/pages/SplashPage'
import { Logo } from '@/components/Logo'
import { colors, flex, padding, text } from '@/styles'
import { css } from '@emotion/react'

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<ProtectedLayout />}>
        <Route path="/" element={<HomeLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/done" element={<div>done</div>} />
        </Route>
        <Route path="/raffle/:id" element={<RaffleDetailPage />} />
        <Route path="/raffle/create" element={<CreateRafflePage />} />
        <Route path="/my" element={<MyPage />} />
      </Route>
    </Routes>
  )
}

function ProtectedLayout() {
  const { authenticated, ready } = usePrivy()
  return (
    <Layout>
      {ready ? authenticated ? <Outlet /> : <LoginPage /> : <SplashPage />}
    </Layout>
  )
}

function HomeLayout() {
  return (
    <main css={[{ height: '100%' }, flex.y({ align: 'stretch' })]}>
      <header
        css={[
          flex.x({ justify: 'space-between' }),
          padding.x(20),
          padding.y(10),
        ]}
      >
        <Logo w={108} h={32} />
        <Link to="/my" css={{}}>
          My
        </Link>
      </header>
      <nav
        css={[
          flex.x({ align: 'stretch' }),
          padding.x(12),
          padding.top(8),
          {
            borderBottomWidth: 1,
            borderBottomColor: colors.gray200,
            borderBottomStyle: 'solid',
          },
        ]}
      >
        <NavLink to="/" css={nav}>
          진행 중
        </NavLink>
        <NavLink to="/done" css={nav}>
          완료
        </NavLink>
      </nav>

      <div css={{ overflowY: 'scroll', flex: 1 }}>
        <Outlet />
      </div>
    </main>
  )
}

const nav = css([
  {
    flex: 1,
    textAlign: 'center',
    fontWeight: 700,
    fontSize: 16,

    '&.active': {
      borderBottomWidth: 2,
      borderBottomColor: colors.black,
      borderBottomStyle: 'solid',
      color: colors.black,
    },
  },
  padding.y(8),
  text.gray400,
])
