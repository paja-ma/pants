import { usePrivy } from '@privy-io/react-auth'
import { Logo } from '@/components/Logo'
import { colors } from '@/styles'
import styles from './LoginPage.module.css'

export function LoginPage() {
  const { login } = usePrivy()

  return (
    <div className={styles.wrapper}>
      <Logo w={200} h={100} color1={colors.primary} color2="#B9ACED" />
      <button onClick={login} className={styles.loginButton}>
        로그인
      </button>
    </div>
  )
}
