import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { RaffleCard } from '@/components/RaffleCard'
import { raffleService } from '@/services/raffleService'
import type { Raffle } from '@/types/raffle'
import styles from './HomePage.module.css'
import { usePrivy } from '@privy-io/react-auth'
import { getTransactionsByAccount } from '@/lib/nodit/getTransactionsByAccount.ts'
import { getParticipantAddressesOfRaffle } from '@/lib/nodit/getParticipantsOfRaffle.ts'

export function HomePage() {
  const [raffles, setRaffles] = useState<Raffle[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { user } = usePrivy()

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

  useEffect(() => {
    if (!user?.wallet) return
    ;(async () => {
      const { items: myTransactions } = await getTransactionsByAccount({
        protocol: 'ethereum',
        network: 'sepolia',
        address: user!.wallet!.address,
        relation: 'from',
      })
      console.log('myTransactions', myTransactions)

      const participantAddresses = await getParticipantAddressesOfRaffle(
        '0x7b09D796b14530442554E40a47239dBF955cf738'
      )
      console.log('participants', participantAddresses)
    })()
  }, [user, user?.wallet])

  if (isLoading) {
    return <div>Loading...</div>
  }

  const activeRaffles = raffles.filter((raffle) => !raffle.isClosed)
  const endedRaffles = raffles.filter((raffle) => raffle.isClosed)
  // const endedRaffles: Raffle[] = []

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
      <Link to="/raffle/create" className={styles.createRaffleButton}>
        래플 만들기
      </Link>
    </>
  )
}
