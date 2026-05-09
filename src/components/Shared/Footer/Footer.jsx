import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className='bg-rose-50/20 py-8 px-6 md:px-12 border-t border-rose-500/10'>
      <div className='max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6'>
        
        {/* Brand / Logo */}
        <Link to='/' className='flex items-center gap-3'>
          <div className='w-8 h-8 bg-gradient-to-r from-rose-400 to-pink-500 text-white rounded-full flex items-center justify-center font-bold text-xs shadow-md shadow-rose-500/20'>
            A
          </div>
          <span className='text-xl font-extrabold tracking-widest uppercase text-white drop-shadow-sm' style={{ color: 'white', WebkitTextStroke: '1px #f43f5e' }}>
            ACCOMO
          </span>
        </Link>

        {/* Links */}
        <div className='flex space-x-8 text-sm text-rose-500/70 font-medium'>
          <a href='#' className='hover:text-rose-500 transition-colors'>Privacy Policy</a>
          <a href='#' className='hover:text-rose-500 transition-colors'>Terms of Service</a>
          <a href='#' className='hover:text-rose-500 transition-colors'>Contact Us</a>
        </div>

        {/* Copyright */}
        <div className='text-xs text-rose-500/60 font-medium'>
          <p>© 2023 Accomo Global Rentals. All rights reserved.</p>
        </div>

      </div>
    </footer>
  )
}

export default Footer
