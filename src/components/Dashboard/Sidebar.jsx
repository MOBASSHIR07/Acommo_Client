import { useEffect, useState } from 'react'
import { GrLogout } from 'react-icons/gr'
import { FcSettings } from 'react-icons/fc'
import { AiOutlineBars } from 'react-icons/ai'
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import useRole from '../../hooks/useRole'
import Menu from './Menu'

const Sidebar = () => {
  const { logOut } = useAuth()
  const [isActive, setActive] = useState(false)
  const [role, isLoading] = useRole()
  const navigate = useNavigate()
  const location = useLocation()

  // Get viewMode from URL or default to 'host'
  const getViewModeFromURL = () => {
    const params = new URLSearchParams(location.search)
    return params.get('view') || 'host'
  }

  const [viewMode, setViewMode] = useState(getViewModeFromURL())

  const handleToggle = () => setActive(!isActive)

  // Update viewMode when URL changes
  useEffect(() => {
    setViewMode(getViewModeFromURL())
  }, [location.search])

  const handleViewModeChange = (mode) => {
    setViewMode(mode)
    // Update URL with the new view mode
    navigate(`/dashboard?view=${mode}`)
  }

  const navItemStyle = ({ isActive }) =>
    `flex items-center gap-3 px-5 py-3 my-1 rounded-lg transition-all duration-300 ${
      isActive
        ? 'bg-gradient-to-r from-rose-400 to-pink-500 text-white shadow-md scale-[1.02]'
        : 'text-[#59413F] hover:bg-rose-50 hover:text-rose-500'
    }`

  return (
    <>
      {/* Mobile Header */}
      <div className="bg-[#FFF0EF] border-b border-[#EAD3D2] text-[#261817] flex justify-between items-center md:hidden shadow-sm">
        <Link to="/" className="p-3 flex items-center gap-2">
          <div className='w-6 h-6 bg-gradient-to-r from-rose-400 to-pink-500 text-white rounded-full flex items-center justify-center font-bold text-[10px] shadow-sm'>
            A
          </div>
          <span className='text-sm font-extrabold tracking-widest uppercase text-rose-500'>
            ACCOMO
          </span>
        </Link>
        <button
          onClick={handleToggle}
          className="p-3 focus:outline-none hover:bg-[#EAD3D2]/30 rounded-lg transition"
        >
          <AiOutlineBars className="h-6 w-6 text-rose-500" />
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`z-20 md:fixed flex flex-col justify-between bg-white md:bg-[#FFF0EF]/95 backdrop-blur-md shadow-lg w-64 min-h-screen px-4 py-6 absolute inset-y-0 left-0 transform ${
          !isActive ? '-translate-x-full' : 'translate-x-0'
        } md:translate-x-0 transition-transform duration-300 ease-in-out rounded-r-2xl border-r border-[#EAD3D2]`}
      >
        <div>
          {/* Logo */}
          <div className="hidden md:flex justify-center mb-8">
            <Link to="/" className="flex items-center gap-3">
              <div className='w-8 h-8 bg-gradient-to-r from-rose-400 to-pink-500 text-white rounded-full flex items-center justify-center font-bold text-xs shadow-md'>
                A
              </div>
              <span className='text-xl font-extrabold tracking-widest uppercase text-rose-500'>
                ACCOMO
              </span>
            </Link>
          </div>

          {/* Host View Toggle */}
          {role === 'host' && (
            <div className="mb-6 p-3 bg-white/50 rounded-xl border border-[#EAD3D2]">
              <p className="text-xs font-medium text-[#59413F] mb-2 text-center uppercase tracking-wider">View Mode</p>
              <div className="flex bg-white rounded-lg p-1 shadow-sm border border-[#EAD3D2]">
                <button
                  onClick={() => handleViewModeChange('guest')}
                  className={`flex-1 py-2 px-3 text-xs font-bold rounded-md transition-all duration-200 uppercase tracking-tighter ${
                    viewMode === 'guest'
                      ? 'bg-gradient-to-r from-rose-400 to-pink-500 text-white shadow-sm'
                      : 'text-[#59413F] hover:text-rose-500'
                  }`}
                >
                  Guest
                </button>
                <button
                  onClick={() => handleViewModeChange('host')}
                  className={`flex-1 py-2 px-3 text-xs font-bold rounded-md transition-all duration-200 uppercase tracking-tighter ${
                    viewMode === 'host'
                      ? 'bg-gradient-to-r from-rose-400 to-pink-500 text-white shadow-sm'
                      : 'text-[#59413F] hover:text-rose-500'
                  }`}
                >
                  Host
                </button>
              </div>
            </div>
          )}

          {/* Menus */}
          <nav className="flex flex-col mt-2">
            {!isLoading && <Menu role={role} viewMode={viewMode} />}
          </nav>
        </div>

        {/* Bottom */}
        <div className="pt-4 border-t border-[#EAD3D2]">
          <NavLink to="/dashboard/profile" className={navItemStyle}>
            <FcSettings className="w-5 h-5" />
            <span className="font-semibold uppercase text-xs tracking-wider">Profile</span>
          </NavLink>

          <button
            onClick={logOut}
            className="flex items-center gap-3 w-full px-5 py-3 mt-2 rounded-lg text-[#59413F] hover:bg-rose-500/10 hover:text-rose-500 transition-all duration-300 group"
          >
            <GrLogout className="w-5 h-5 transition-transform group-hover:scale-110" />
            <span className="font-semibold uppercase text-xs tracking-wider">Logout</span>
          </button>
        </div>
      </aside>
    </>
  )
}

export default Sidebar