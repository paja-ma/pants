import styled from '@emotion/styled'
import { useLocation, useNavigate } from 'react-router-dom'
import { Logo } from './common/Logo'

const ROUTES_WITH_BACK_BUTTON = ['/raffle/create', '/raffle']

export function Header() {
  const location = useLocation()
  const navigate = useNavigate()
  const showBackButton = ROUTES_WITH_BACK_BUTTON.some((route) =>
    location.pathname.startsWith(route)
  )

  return (
    <HeaderWrapper>
      <HeaderContent>
        <LeftSection>
          {showBackButton && (
            <BackButton onClick={() => navigate(-1)}>
              <span>←</span>
            </BackButton>
          )}
        </LeftSection>
        <CenterSection>
          <LogoWrapper onClick={() => navigate('/')}>
            <Logo size={28} />
          </LogoWrapper>
        </CenterSection>
        <RightSection>
          <HeaderButton>마이</HeaderButton>
        </RightSection>
      </HeaderContent>
    </HeaderWrapper>
  )
}

const HeaderWrapper = styled.header`
  width: 100%;
  height: 60px;
  border-bottom: 1px solid #e9ecef;
  background: white;
  position: sticky;
  top: 0;
  z-index: 100;
`

const HeaderContent = styled.div`
  max-width: 1200px;
  height: 100%;
  margin: 0 auto;
  padding: 0 24px;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
`

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`

const CenterSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const RightSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
`

const BackButton = styled.button`
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #495057;
  font-size: 20px;

  &:hover {
    color: #212529;
  }
`

const HeaderButton = styled.button`
  background: none;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  color: #495057;
  font-size: 14px;

  &:hover {
    color: #212529;
  }
`

const LogoWrapper = styled.div`
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f8f9fa;
  }
`
