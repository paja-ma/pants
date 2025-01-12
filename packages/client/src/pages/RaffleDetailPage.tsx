import { useParams, useNavigate } from 'react-router-dom'
import type { Address } from 'viem'
import styled from '@emotion/styled'
import { Button } from '@/components/common/Button'
import { Card } from '@/components/common/Card'
import useRaffleDetail from '@/hooks/useRaffleDetail'
import { CTA } from '@/components/CTA'

export function RaffleDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  if (!id) {
    navigate('/')
  }

  const raffle = useRaffleDetail(id as Address)

  const handleParticipate = async () => {
    if (!id) return
    try {
      // TODO: API 연동
      console.log('Participating in raffle:', id)
    } catch (error) {
      console.error('Failed to participate in raffle:', error)
    }
  }

  if (!raffle) {
    return <div>Loading...</div>
  }

  return (
    <Container>
      <ContentWrapper>
        <Section>
          <Card>
            <RaffleInfo>
              <MainInfo>
                <Title>{raffle.title}</Title>
                <Description>{raffle.description}</Description>
                {raffle.numberOfWinners?.toString() ?? '?'} 명 추첨
                {raffle.imageUrl ? (
                  <RaffleImage src={raffle.imageUrl} alt={raffle.title} />
                ) : (
                  <RaffleImagePlaceholder />
                )}
              </MainInfo>
            </RaffleInfo>
          </Card>
        </Section>

        {raffle.isClosed ? (
          // 종료된 래플 UI
          <>
            <Section>
              <SectionTitle>당첨 코드 디코딩(?)</SectionTitle>
              <Card>
                <PlaceholderBox />
              </Card>
            </Section>

            <Section>
              <SectionTitle>래플 당첨 결과 주르륵</SectionTitle>
              <Card>
                <PlaceholderBox />
              </Card>
            </Section>
          </>
        ) : (
          // 진행 중인 래플 UI
          <Section>
            <SectionTitle>래플 응모 대기 주르륵</SectionTitle>
            <Card>
              <PlaceholderBox />
            </Card>
          </Section>
        )}

        {/* <ButtonSection> */}
        {/* {!raffle.isClosed && !raffle.isCreator && ( */}
        {/*   <ParticipateButton onClick={handleParticipate}> */}
        {/*     응모하기 */}
        {/*   </ParticipateButton> */}
        {/* )} */}
        {/* {!raffle.isClosed && raffle.isCreator && (
            <EndRaffleButton onClick={handleEndRaffle}>
              래플 종료하기
            </EndRaffleButton>
          )} */}
        {/* </ButtonSection> */}
        <CTA onClick={handleParticipate}>응모하기</CTA>
      </ContentWrapper>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  padding: 24px 16px;
`

const ContentWrapper = styled.div`
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

const RaffleInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 24px;
`

const MainInfo = styled.div`
  flex: 1;
`

const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: #212529;
  margin: 0 0 8px 0;
`

const Description = styled.p`
  font-size: 16px;
  color: #495057;
  margin: 0;
`

const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #212529;
  margin: 0;
`

// const EndRaffleButton = styled(Button)`
//   background-color: #fa5252;
//   color: white;
//   border: none;
//   padding: 12px 24px;
//   font-size: 16px;

//   &:hover {
//     background-color: #e03131;
//   }
// `

const RaffleImage = styled.img`
  width: 100%;
  height: 240px;
  object-fit: cover;
  border-radius: 8px;
  margin-top: 16px;
`

const RaffleImagePlaceholder = styled.div`
  width: 100%;
  height: 240px;
  background-color: #f8f9fa;
  border-radius: 8px;
  margin-top: 16px;
`

const ButtonSection = styled.div`
  margin-top: 16px;
  display: flex;
  justify-content: center;
  gap: 16px;
`

const ParticipateButton = styled(Button)`
  padding: 12px 48px;
  font-size: 16px;
  background-color: #228be6;
  color: white;
  border: none;

  &:hover {
    background-color: #1c7ed6;
  }

  &:disabled {
    background-color: #adb5bd;
    cursor: not-allowed;
  }
`

const PlaceholderBox = styled.div`
  width: 100%;
  height: 120px;
  background-color: #f8f9fa;
  border-radius: 8px;
  margin: 16px 0;
`
