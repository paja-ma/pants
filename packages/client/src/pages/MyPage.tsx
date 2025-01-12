import { useNavigate } from 'react-router-dom'
import { usePrivy } from '@privy-io/react-auth'
import { Card } from '@/components/common/Card'
import styles from './MyPage.module.css'
import { useEffect, useState } from 'react'
import getOwnRaffle from '@/hooks/getOwnRaffle'
import { Address } from 'viem'
import { RaffleCard } from '@/components/RaffleCard'

export function MyPage() {
  const navigate = useNavigate()
  const { user, logout } = usePrivy()

  const [ownedRaffles, setOwnedRaffles] = useState<Address[]>([])
  useEffect(() => {
    getOwnRaffle(user?.wallet?.address as Address).then((res) => {
      setOwnedRaffles(res as Address[])
    })
  }, [])

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  return (
    <>
      <main className={styles.main}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>지갑 주소</h2>
          <Card>
            <span className={styles.address}>{user?.wallet?.address}</span>
          </Card>
        </section>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>내가 만든 래플 목록</h2>
          <ul className={styles.raffleList}>
            {ownedRaffles.map((raffleId) => (
              <li key={raffleId}>
                <RaffleCard raffleId={raffleId} />
              </li>
            ))}
          </ul>
        </section>
      </main>
      <button onClick={handleLogout} className={styles.signOutButton}>
        로그아웃
      </button>
    </>
  )
}
