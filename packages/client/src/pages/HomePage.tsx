import styled from '@emotion/styled'
import { RaffleCard } from '../components/RaffleCard'

export function HomePage() {
  return (
    <Container>
      <Section>
        <SectionTitle>진행 중인 래플 목록</SectionTitle>
        <RaffleList>
          <RaffleCard
            title="귀여운 수면바지"
            description="적당한 설명"
            onParticipate={() => console.log('참여!')}
          />
          <RaffleCard
            title="이쁜 슬리퍼"
            description="적당한 설명"
            onParticipate={() => console.log('참여!')}
          />
        </RaffleList>
      </Section>

      <Section>
        <SectionTitle>끝난 래플 목록</SectionTitle>
        <RaffleList>
          <RaffleCard
            title="끝난 래플 1"
            description="적당한 설명"
            isEnded
            onParticipate={() => console.log('결과 보기')}
          />
          <RaffleCard
            title="끝난 래플 2"
            description="적당한 설명"
            isEnded
            onParticipate={() => console.log('결과 보기')}
          />
        </RaffleList>
      </Section>
    </Container>
  )
}

const Container = styled.div`
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 48px;
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
