import { Outlet, useLocation } from 'react-router-dom'
import Navbar from '../components/Shared/Navbar/Navbar'
import Footer from '../components/Shared/Footer/Footer'
const Main = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  
  return (
    <div className="bg-background text-on-background font-sans antialiased overflow-x-hidden min-h-screen">
      <Navbar />
      <div className={isHome ? 'min-h-[calc(100vh-68px)]' : 'pt-24 min-h-[calc(100vh-68px)]'}>
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default Main
