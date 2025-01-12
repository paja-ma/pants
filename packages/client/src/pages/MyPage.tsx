import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Address } from 'viem'
import { usePrivy } from '@privy-io/react-auth'
import { CTA } from '@/components/CTA'
import { RaffleCard } from '@/components/RaffleCard'
import { Card } from '@/components/common/Card'
import getOwnRaffle from '@/hooks/getOwnRaffle'
import useRafflesDetail from '@/hooks/useRafflesDetail'
import styles from './MyPage.module.css'

function RaffleList({ raffleIds }: { raffleIds: Address[] }) {
  const ownedRaffles = useRafflesDetail(raffleIds)
  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>내가 만든 래플 목록</h2>
      {ownedRaffles.length === 0 ? (
        <Card>
          <p className={styles.emptyText}>아직 만든 래플이 없습니다.</p>
        </Card>
      ) : (
        <ul className={styles.raffleList}>
          {ownedRaffles.map((raffle) => (
            <li key={raffle.id}>
              <RaffleCard raffle={raffle} />
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export function MyPage() {
  const navigate = useNavigate()
  const { user, logout } = usePrivy()

  const [ownedRaffles, setOwnedRaffles] = useState<Address[]>([])
  useEffect(() => {
    getOwnRaffle(user?.wallet?.address as Address).then((res) => {
      setOwnedRaffles(res as Address[])
    })
  }, [user])

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
        <RaffleList raffleIds={ownedRaffles} />
      </main>
      <CTA onClick={handleLogout} css={{ 'background-color': '#fa5252' }}>
        로그아웃
      </CTA>
    </>
  )
}
