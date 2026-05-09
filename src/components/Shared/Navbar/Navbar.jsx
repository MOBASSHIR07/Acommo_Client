import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import useAuth from '../../../hooks/useAuth'
import avatarImg from '../../../assets/images/placeholder.jpg'
import HostRequestModal from '../../Modal/HostRequestModal'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import toast from 'react-hot-toast'

const Navbar = () => {
  const axiosSecure = useAxiosSecure()
  const { user, logOut } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isTransparent = isHome && !isScrolled

  const [isModalOpen, setIsModalOpen] = useState(false)
  const closeModal = () => setIsModalOpen(false)

  const modalHandler = async () => {
    console.log('I want be a host')
    try {
      const currentUser = { email: user?.email, role: 'guest', status: 'Requested' }
      const { data } = await axiosSecure.put(`/user`, currentUser)
      if (data.modifiedCount > 0) {
        toast.success('Host Request Send..Please wait for Admin Approval')
      } else {
        toast.success('Please wait for Admin Approval')
      }
    } catch (err) {
      console.log(err)
      toast.error(err)
    } finally {
      closeModal()
    }
  }

  const navLinks = [
    { label: 'Homes', href: '#' },
    { label: 'Experiences', href: '#' },
    { label: 'Online Experiences', href: '#' },
  ]

  // FIXED HEIGHT - No layout shift
  const navBase = 'fixed w-full z-50 transition-all duration-500 px-4 md:px-8 flex items-center justify-between h-[70px] md:h-[80px]'
  
  // Smooth background/opacity transitions only
  const navState = isTransparent
    ? 'bg-transparent/0 backdrop-blur-none border-transparent shadow-none'
    : 'bg-white/95 backdrop-blur-md border-b border-outline-variant/40 shadow-sm'

  const logoTextColor = isTransparent ? 'text-white' : 'text-black'
  const linkBase = 'text-[13px] font-medium tracking-[0.01em] pb-0.5 border-b-2 transition-all duration-300'
  const linkState = isTransparent
    ? 'text-white/80 border-transparent hover:text-white hover:border-white/50'
    : 'text-black border-transparent hover:text-rose-500 hover:border-rose-500/50'

  const hostBtnColor = isTransparent ? 'text-white/90 hover:text-white' : 'text-black hover:text-rose-500'
  const userBtnState = isTransparent
    ? 'border-white/40 hover:bg-white/10 backdrop-blur-sm'
    : 'border-black/60 hover:bg-gray-100'
  const hamburgerColor = isTransparent ? 'bg-white' : 'bg-black'

  return (
    <nav className={`${navBase} ${navState}`}>
      {/* Logo */}
      <Link to='/' className='flex items-center gap-2.5 flex-shrink-0'>
        <div className='w-8 h-8 bg-gradient-to-r from-rose-400 to-pink-500 rounded-full flex items-center justify-center shadow-lg shadow-rose-500/20'>
          <span className='text-white font-extrabold text-xs'>A</span>
        </div>
        <span className={`text-[17px] font-extrabold tracking-[-0.04em] uppercase transition-all duration-500 ${logoTextColor}`}>
          Accomo
        </span>
      </Link>

      {/* Center Nav Links */}
      <div className='hidden md:flex items-center gap-8'>
        {navLinks.map((link) => (
          <a key={link.label} href={link.href} className={`${linkBase} ${linkState}`}>
            {link.label}
          </a>
        ))}
      </div>

      {/* Right Side */}
      <div className='flex items-center gap-4 relative'>
        {/* Become a Host */}
        <button
          onClick={() => setIsModalOpen(true)}
          className={`hidden md:block text-[13px] font-semibold tracking-[0.01em] transition-all duration-300 border border-current/20 px-3 py-1.5 rounded-full ${hostBtnColor}`}
        >
          Become a Host
        </button>

        <HostRequestModal isOpen={isModalOpen} closeModal={closeModal} modalHandler={modalHandler} />

        {/* User Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center gap-2.5 rounded-full py-2 px-3.5 border transition-all duration-300 ${userBtnState}`}
        >
          {/* Hamburger */}
          <div className='flex flex-col justify-between w-[18px] h-[13px]'>
            {[0, 1, 2].map((i) => (
              <span 
                key={i} 
                className={`block h-[1.5px] rounded-full transition-all duration-300 ${hamburgerColor}`} 
              />
            ))}
          </div>

          {/* Avatar */}
          <div className='hidden md:block'>
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt='profile'
                referrerPolicy='no-referrer'
                className='w-7 h-7 rounded-full object-cover'
              />
            ) : (
              <div className='w-7 h-7 rounded-full bg-gradient-to-r from-rose-400 to-pink-500 flex items-center justify-center shadow-sm'>
                <span className='text-white text-[11px] font-bold'>
                  {user?.displayName?.[0]?.toUpperCase() ?? 'U'}
                </span>
              </div>
            )}
          </div>
        </button>

        {/* Dropdown - Smooth positioning */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className='absolute right-0 top-[calc(100%+12px)] w-56 bg-white rounded-2xl border border-outline-variant/50 shadow-xl backdrop-blur-sm overflow-hidden z-50 py-1.5'
          >
            {/* Rest of dropdown content stays the same */}
            <Link
              to='/'
              className='flex md:hidden px-4 py-2.5 text-[13px] font-semibold text-on-surface hover:bg-surface-container-low transition-colors'
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            
            {/* Mobile-only Nav Links */}
            <div className='md:hidden'>
              {navLinks.map((link) => (
                <a 
                  key={link.label} 
                  href={link.href} 
                  className='flex px-4 py-2.5 text-[13px] font-semibold text-on-surface hover:bg-surface-container-low transition-colors'
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <button
                onClick={() => { setIsModalOpen(true); setIsOpen(false); }}
                className='w-full text-left px-4 py-2.5 text-[13px] font-semibold text-on-surface hover:bg-surface-container-low transition-colors'
              >
                Become a Host
              </button>
              <div className='mx-4 h-px bg-outline-variant/50 my-1' />
            </div>

            {user ? (
              <>
                <Link
                  to='/dashboard'
                  className='flex px-4 py-2.5 text-[13px] font-semibold text-on-surface hover:bg-surface-container-low transition-colors'
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </Link>
                <div className='mx-4 h-px bg-outline-variant/50 my-1' />
                <button
                  onClick={() => { logOut(); setIsOpen(false) }}
                  className='w-full text-left px-4 py-2.5 text-[13px] font-semibold text-rose-500 hover:bg-surface-container-low transition-colors'
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to='/login'
                  className='flex px-4 py-2.5 text-[13px] font-semibold text-on-surface hover:bg-surface-container-low transition-colors'
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to='/signup'
                  className='flex px-4 py-2.5 text-[13px] font-semibold text-on-surface hover:bg-surface-container-low transition-colors'
                  onClick={() => setIsOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </motion.div>
        )}
        </AnimatePresence>
      </div>
    </nav>
  )
}

export default Navbar