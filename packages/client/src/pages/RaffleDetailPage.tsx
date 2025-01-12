import { useParams, useNavigate } from 'react-router-dom'
import type { Address } from 'viem'
import useRaffleDetail from '@/hooks/useRaffleDetail'
import { CTA } from '@/components/CTA'
import { bg, flex, h, margin, padding, text, w } from '@/styles'
import { useTimeLeft } from '@/hooks/useTimeLeft'

export function RaffleDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const { timeLeft } = useTimeLeft(new Date('2024-01-15'))

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
    <main css={{ overflowY: 'scroll', height: '100%' }}>
      <div
        css={[
          {
            backgroundImage: `url(${
              raffle.imageUrl ??
              'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png'
            } )`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          },
          w('fill'),
          h(200),
        ]}
      />

      <section css={[padding.y(32), padding.x(24), flex.y({ gap: 8 })]}>
        <h1 css={text.title1}>랜덤 수면바지 2개 증정</h1>

        <p css={[text.gray500, text.subtitle]}>
          <span css={[text.primary, { fontWeight: 600 }]}>1명 추첨</span>

          <span> · 현재 23명 지원 중</span>
        </p>

        <p css={[text.gray500, text.body, padding.top(6)]}>
          이건 설명이에요. 여기에 이벤트 설명을 적을 수 있어요.
        </p>
      </section>

      <section
        css={[
          margin.x(24),
          bg.gray200,
          padding.y(12),
          padding.x(20),
          { borderRadius: 12 },
        ]}
      >
        {Array(10)
          .fill(0)
          .map((_, index) => (
            <div
              css={[text.subtitle, flex.x({ gap: 8 }), { lineHeight: '180%' }]}
            >
              <div css={[w(64), text.primary, { fontWeight: 600 }]}>0x2f3w</div>

              <div css={[text.gray500, { fontWeight: 400 }]}>
                {index + 1} 번째로 응모했어요
              </div>
            </div>
          ))}
      </section>

      <div css={h(150)} />

      <CTA
        description={`22:30:${(timeLeft % 60) + 60} 후 응모가 마감돼요`}
        onClick={handleParticipate}
      >
        응모하기
      </CTA>
    </main>
  )
}
