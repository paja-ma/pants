import { usePrivy } from '@privy-io/react-auth'
import styles from './LoginPage.module.css'

export function LoginPage() {
  const { login } = usePrivy()

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>래플잇</h1>
      <button onClick={login} className={styles.loginButton}>
        로그인
      </button>
    </div>
  )
}
