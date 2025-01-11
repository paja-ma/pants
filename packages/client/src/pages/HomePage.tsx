import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { RaffleCard } from '@/components/RaffleCard'
import { raffleService } from '@/services/raffleService'
import type { Raffle } from '@/types/raffle'
import styles from './HomePage.module.css'

import writeExample from '../hooks/writeExample'

export function HomePage() {
  const [raffles, setRaffles] = useState<Raffle[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
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
    <>
      <header className={styles.header}>
        <h1 className={styles.headerTitle}>래플잇</h1>
        <Link to="/my" className={styles.myProfileLink}>
          My
        </Link>
      </header>
      <main className={styles.main}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>진행 중인 래플 목록</h2>
          <ul className={styles.raffleList}>
            {activeRaffles.map((raffle) => (
              <li key={raffle.id}>
                <RaffleCard raffle={raffle} />
              </li>
            ))}
          </ul>
        </section>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>끝난 래플 목록</h2>
          <ul className={styles.raffleList}>
            {endedRaffles.map((raffle) => (
              <li key={raffle.id}>
                <RaffleCard raffle={raffle} />
              </li>
            ))}
          </ul>
        </section>
      </main>
      <button
        onClick={() => writeExample('haha')}
        className={styles.createRaffleButton}
      >
        래플 만들기
      </button>
    </>
  )
}
