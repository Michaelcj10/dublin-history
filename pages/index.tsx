import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter()
  useEffect(() => { router.replace('/1916') }, [router])
  return (
    <div style={{
      background: '#1a1208', color: '#f0e8d0', height: '100vh',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: "'IM Fell English', Georgia, serif", fontSize: 18
    }}>
      The Dublin Chronicle · 1916
    </div>
  )
}