import { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { RaffleCard } from '../components/RaffleCard'
import { raffleService } from '../services/raffleService'
import { Raffle } from '../types/raffle'

export function HomePage() {
  const [raffles, setRaffles] = useState<Raffle[]>([])
  const [isLoading, setIsLoading] = useState(true)

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
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  background: #f8f9fa;
  padding: 24px 16px;
  display: flex;
  flex-direction: column;
  gap: 24px;
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
