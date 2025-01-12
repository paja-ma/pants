import { Link } from 'react-router-dom'
import styles from './RaffleCard.module.css'
import { RaffleDetail } from '@/types/raffle'

export function RaffleCard({ raffle }: { raffle: RaffleDetail }) {
  return (
    <Link to={`/raffle/${raffle.id}`} className={styles.card}>
      <h3 className={styles.title}>{raffle.title}</h3>
      <div className={styles.metadata}>
        <span>{raffle.numberOfWinners?.toString()}명 추첨</span> ·{' '}
        <span>{raffle.participants}명 지원</span>
      </div>
      <div className={styles.creator}>
        <img
          src={raffle.creator?.avatarUrl}
          alt={raffle.creator?.name}
          className={styles.avatar}
        />
        <span className={styles.creatorName}>{raffle.creator?.name}</span>
      </div>
    </Link>
  )
}
