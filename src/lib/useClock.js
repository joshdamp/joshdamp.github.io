import { useEffect, useState } from 'react'

const fmt = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Manila', hour: '2-digit', minute: '2-digit' })

// the time in Manila, refreshed every 30 seconds
export default function useClock() {
  const [now, setNow] = useState(() => fmt.format(new Date()))
  useEffect(() => {
    const id = setInterval(() => setNow(fmt.format(new Date())), 30000)
    return () => clearInterval(id)
  }, [])
  return now
}
