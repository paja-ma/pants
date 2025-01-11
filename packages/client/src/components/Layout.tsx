import type { ReactNode } from 'react'
import styles from './Layout.module.css'

export function Layout({ children }: { children: ReactNode }) {
  return <div className={styles.wrapper}>{children}</div>
}
