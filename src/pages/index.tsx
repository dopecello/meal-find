import { Inter } from 'next/font/google'
import Background from '../components/Background'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
   <Background />
  )
}
