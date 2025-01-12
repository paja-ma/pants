import useRafflesDetail from '@/hooks/useRafflesDetail'
import styles from './HomePage.module.css'
import { Card } from '@/components/common/Card'
import { RaffleCard } from '@/components/RaffleCard'
import { padding } from '@/styles'

export function DonePage() {
  const raffles = useRafflesDetail([])

  const endedRaffles = raffles.filter((raffle) => raffle.isClosed)

  return (
    <section css={[padding.x(24), padding.y(32)]}>
      {endedRaffles.length === 0 ? (
        <Card>
          <p className={styles.emptyText}>끝난 래플이 없습니다.</p>
        </Card>
      ) : (
        <ul className={styles.raffleList}>
          {endedRaffles.map((raffle) => (
            <li key={raffle.id}>
              <RaffleCard raffle={raffle} />
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
