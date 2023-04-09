import { Inter } from 'next/font/google'
import Background from '../components/Background'
import Nav from '@/components/Logo'
import Main from '@/components/Main'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className='bg-lite-green'>
      <Main />
    </div>
  )
}
