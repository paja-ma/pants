import { useEffect, useState } from 'react'

export function useTimeLeft(targetDate: Date) {
  const getDeltaFromNow = () =>
    Math.floor((targetDate.getTime() - new Date().getTime()) / 1000)

  const [timeLeft, setTimeLeft] = useState(getDeltaFromNow())

  useEffect(() => {
    const interval = setInterval(() => setTimeLeft(getDeltaFromNow()), 1000)
    return () => clearInterval(interval)
  })

  return { timeLeft }
}
