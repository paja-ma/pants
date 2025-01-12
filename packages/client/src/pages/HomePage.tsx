import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { RaffleCard } from '@/components/RaffleCard'
import styles from './HomePage.module.css'
import { usePrivy } from '@privy-io/react-auth'
import { getTransactionsByAccount } from '@/lib/nodit/getTransactionsByAccount.ts'
import { getParticipantAddressesOfRaffle } from '@/lib/nodit/getParticipantsOfRaffle.ts'
import { CTA } from '@/components/CTA'
import { Logo } from '@/components/Logo'
// import { useRegisterRaffle } from '@/hooks/useRegisterRaffle.ts'
import { Address } from 'viem'
import getJoinedRaffle from '@/hooks/getJoinedRaffle.ts'
import useRafflesDetail from '@/hooks/useRafflesDetail'

function RaffleList({ raffleIds }: { raffleIds: Address[] }) {
  const raffles = useRafflesDetail(raffleIds)
  const activeRaffles = raffles.filter((raffle) => !raffle.isClosed)
  const endedRaffles = raffles.filter((raffle) => raffle.isClosed)

  return (
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
  )
}

export function HomePage() {
  const { user } = usePrivy()

  const [joinedRaffleIds, setJoinedRaffleIds] = useState<Address[]>([])
  useEffect(() => {
    getJoinedRaffle(user?.wallet?.address as Address).then((res) => {
      setJoinedRaffleIds(res as Address[])
    })
  }, [user])

  // const { registerRaffle } = useRegisterRaffle()

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

  return (
    <>
      <header className={styles.header}>
        <Logo w={108} h={32} />
        <Link to="/my" className={styles.myProfileLink}>
          My
        </Link>
      </header>
      <RaffleList raffleIds={joinedRaffleIds} />

      <Link to="/raffle/create">
        <CTA>래플 만들기</CTA>
      </Link>
      {/*<button*/}
      {/*  onClick={() =>*/}
      {/*    registerRaffle({*/}
      {/*      raffleAddress: '0x7b09D796b14530442554E40a47239dBF955cf738',*/}
      {/*      nickname: '푸헤헤',*/}
      {/*    })*/}
      {/*  }*/}
      {/*  className={styles.createRaffleButton}*/}
      {/*>*/}
      {/*  래플 참여하기*/}
      {/*</button>*/}
    </>
  )
}
