import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom'
import { usePrivy } from '@privy-io/react-auth'
import { Card } from '../components/common/Card'
import { Button } from '../components/common/Button'

export function MyPage() {
  const navigate = useNavigate()
  const { user, logout } = usePrivy()

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <Container>
      <ContentWrapper>
        <Section>
          <SectionTitle>지갑 정보</SectionTitle>
          <Card>
            <WalletInfo>
              <WalletLabel>Wallet Address</WalletLabel>
              <WalletAddress>{user?.wallet?.address}</WalletAddress>
            </WalletInfo>
          </Card>
        </Section>

        <Section>
          <SectionTitle>참여 중인 래플 목록</SectionTitle>
          <Card>
            <PlaceholderBox />
          </Card>
        </Section>

        <Section>
          <SectionTitle>내가 만든 래플 목록</SectionTitle>
          <Card>
            <PlaceholderBox />
          </Card>
        </Section>

        <LogoutSection>
          <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
        </LogoutSection>
      </ContentWrapper>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  padding: 24px 16px;
`

const ContentWrapper = styled.div`
  max-width: 768px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 32px;
`

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #212529;
  margin: 0;
`

const WalletInfo = styled.div`
  padding: 16px;
`

const WalletLabel = styled.div`
  font-size: 14px;
  color: #868e96;
  margin-bottom: 8px;
`

const WalletAddress = styled.div`
  font-size: 16px;
  color: #212529;
  word-break: break-all;
  font-family: monospace;
`

const PlaceholderBox = styled.div`
  width: 100%;
  height: 120px;
  background-color: #f8f9fa;
  border-radius: 8px;
  margin: 16px 0;
`

const LogoutSection = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 16px;
`

const LogoutButton = styled(Button)`
  padding: 12px 48px;
  font-size: 16px;
  background-color: #fa5252;
  color: white;
  border: none;

  &:hover {
    background-color: #e03131;
  }
`
