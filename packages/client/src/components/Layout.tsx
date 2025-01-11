import { Outlet } from 'react-router-dom'
import { Header } from './Header'
import styles from './Layout.module.css'

export function Layout() {
  return (
    <div className={styles.wrapper}>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  )
}
