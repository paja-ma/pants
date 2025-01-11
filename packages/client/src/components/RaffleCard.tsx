import styled from '@emotion/styled'
import { Card } from './common/Card'
import { Button } from './common/Button'
import { useNavigate } from 'react-router-dom'

interface RaffleCardProps {
  id: string
  title: string
  description: string
  imageUrl?: string
  onParticipate: () => void
  isActive?: boolean
  isEnded?: boolean
}

export function RaffleCard({
  id,
  title,
  description,
  imageUrl,
  onParticipate,
  isActive = true,
  isEnded = false,
}: RaffleCardProps) {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/raffle/${id}`)
  }

  const handleParticipate = (e: React.MouseEvent) => {
    e.stopPropagation()
    onParticipate()
  }

  return (
    <StyledCard onClick={handleClick}>
      <ContentWrapper>
        <TextContent>
          <Title>{title}</Title>
          <Description>{description}</Description>
          <Button onClick={handleParticipate} disabled={!isActive || isEnded}>
            {isEnded ? '응모 결과 보기' : '응모 ㄱㄱ'}
          </Button>
        </TextContent>
        <ImageWrapper>
          {imageUrl ? (
            <Image src={imageUrl} alt={title} />
          ) : (
            <PlaceholderImage />
          )}
        </ImageWrapper>
      </ContentWrapper>
    </StyledCard>
  )
}

const StyledCard = styled(Card)`
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }
`

const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 24px;
`

const TextContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const Title = styled.h3`
  text-align: left;
  font-size: 18px;
  font-weight: 600;
  color: #212529;
  margin: 0;
`

const Description = styled.p`
  text-align: left;
  font-size: 14px;
  color: #495057;
  margin: 0;
`

const ImageWrapper = styled.div`
  width: 120px;
  height: 120px;
  flex-shrink: 0;
`

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
`

const PlaceholderImage = styled.div`
  width: 100%;
  height: 100%;
  background-color: #f8f9fa;
  border-radius: 8px;
`
