import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'

export function MobileLayout() {
  return (
    <>
      <header>
        <Header/>
      </header>
      
      <main className='full-view flex column'>
        <Outlet />
      </main>
    </>
  )
}
export default MobileLayout;