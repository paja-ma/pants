import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from '@emotion/styled'
import { RaffleCard } from '../components/RaffleCard'
import { raffleService } from '../services/raffleService'
import { Raffle } from '../types/raffle'
import { Button } from '../components/common/Button'
import { useAccount } from 'wagmi'

import deploy from '../hooks/deploy'
import writeExample from '../hooks/writeExample'
import { usePrivy } from '@privy-io/react-auth'

export function HomePage() {
  const navigate = useNavigate()
  const [raffles, setRaffles] = useState<Raffle[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { user, logout } = usePrivy()

  const { address } = useAccount()

  useEffect(() => {
    console.log('Current address:', address)
  }, [address])

  useEffect(function fetchRaffles() {
    async function getRaffles() {
      try {
        const data = await raffleService.getRaffles()
        setRaffles(data)
      } catch (error) {
        console.error('Failed to fetch raffles:', error)
      } finally {
        setIsLoading(false)
      }
    }

    getRaffles()
  }, [])

  if (isLoading) {
    return <div>Loading...</div>
  }

  const activeRaffles = raffles.filter((raffle) => !raffle.isEnded)
  const endedRaffles = raffles.filter((raffle) => raffle.isEnded)

  return (
    <Container>
      <ContentWrapper>
        <Header>
          <Title>래플 목록</Title>
          {/* <CreateButton onClick={() => navigate('/raffle/create')}> */}
          <CreateButton onClick={() => writeExample('haha')}>
            래플 만들기
          </CreateButton>
        </Header>

        <Section>
          <SectionTitle>진행 중인 래플 목록</SectionTitle>
          <RaffleList>
            {activeRaffles.map((raffle) => (
              <RaffleCard
                key={raffle.id}
                id={raffle.id}
                title={raffle.title}
                description={raffle.description}
                imageUrl={raffle.imageUrl}
                onParticipate={() => console.log('참여!', raffle.id)}
              />
            ))}
          </RaffleList>
        </Section>

        <Section>
          <SectionTitle>끝난 래플 목록</SectionTitle>
          <RaffleList>
            {endedRaffles.map((raffle) => (
              <RaffleCard
                key={raffle.id}
                id={raffle.id}
                title={raffle.title}
                description={raffle.description}
                imageUrl={raffle.imageUrl}
                isEnded
                onParticipate={() => console.log('결과 보기', raffle.id)}
              />
            ))}
          </RaffleList>
        </Section>
      </ContentWrapper>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  background: #f8f9fa;
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

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Title = styled.h1`
  font-size: 28px;
  font-weight: 600;
  color: #212529;
  margin: 0;
`

const CreateButton = styled(Button)`
  padding: 8px 16px;
  font-size: 14px;
  background-color: #228be6;
  color: white;
  border: none;

  &:hover {
    background-color: #1c7ed6;
  }
`

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 24px;
`

const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: #212529;
  margin: 0;
`

const RaffleList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`
