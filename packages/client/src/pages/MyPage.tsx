import { useNavigate } from 'react-router-dom'
import { usePrivy } from '@privy-io/react-auth'
import { Card } from '@/components/common/Card'
import styles from './MyPage.module.css'

export function MyPage() {
  const navigate = useNavigate()
  const { user, logout } = usePrivy()

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
          <Card />
        </section>
      </main>
      <button onClick={handleLogout} className={styles.signOutButton}>
        로그아웃
      </button>
    </>
  )
}
