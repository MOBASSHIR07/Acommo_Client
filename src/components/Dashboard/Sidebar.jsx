import { useState } from 'react'
import { GrLogout } from 'react-icons/gr'
import { FcSettings } from 'react-icons/fc'
import { BsFillHouseAddFill, BsGraphUp } from 'react-icons/bs'
import { AiOutlineBars } from 'react-icons/ai'
import { MdHomeWork } from 'react-icons/md'
import { Link, NavLink } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

const Sidebar = () => {
  const { logOut } = useAuth()
  const [isActive, setActive] = useState(false)

  const handleToggle = () => setActive(!isActive)

  // active / inactive nav item styles
  const navItemStyle = ({ isActive }) =>
    `flex items-center gap-3 px-5 py-3 my-1 rounded-lg transition-all duration-300 ${
      isActive
        ? 'bg-gradient-to-r from-rose-400 to-pink-500 text-white shadow-md scale-[1.02]'
        : 'text-gray-600 hover:bg-gray-100 hover:text-rose-500'
    }`

  return (
    <>
      {/* Mobile Header */}
      <div className="bg-white border-b border-gray-200 text-gray-800 flex justify-between items-center md:hidden shadow-sm">
        <Link to="/" className="p-3">
          <img
            src="https://i.ibb.co.com/rSxrRsJ/Gemini-Generated-Image-5mfie25mfie25mfi.png"  
            alt="logo"
            className="w-24 h-auto"
          />
        </Link>
        <button
          onClick={handleToggle}
          className="p-3 focus:outline-none hover:bg-gray-100 rounded-lg transition"
        >
          <AiOutlineBars className="h-6 w-6 text-rose-500" />
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`z-20 md:fixed flex flex-col justify-between bg-white/95 backdrop-blur-md shadow-lg w-64 min-h-screen px-4 py-6 absolute inset-y-0 left-0 transform ${
          !isActive ? '-translate-x-full' : 'translate-x-0'
        } md:translate-x-0 transition-transform duration-300 ease-in-out rounded-r-2xl`}
      >
        <div>
          {/* Logo */}
          <div className="hidden md:flex justify-center mb-8">
            <Link to="/" className="flex items-center gap-2">
              <img
                src="https://i.ibb.co.com/rSxrRsJ/Gemini-Generated-Image-5mfie25mfie25mfi.png" 
                alt="logo"
                className="w-28 h-auto mr-8"
              />
            </Link>
          </div>

          {/* Menu */}
          <nav className="flex flex-col mt-2">
            <NavLink to="/dashboard" end className={navItemStyle}>
              <BsGraphUp className="w-5 h-5" />
              <span>Statistics</span>
            </NavLink>

            <NavLink to="addroom" className={navItemStyle}>
              <BsFillHouseAddFill className="w-5 h-5" />
              <span>Add Room</span>
            </NavLink>

            <NavLink to="mylistings" className={navItemStyle}>
              <MdHomeWork className="w-5 h-5" />
              <span>My Listings</span>
            </NavLink>
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="pt-4 border-t border-gray-200">
          <NavLink to="/dashboard/profile" className={navItemStyle}>
            <FcSettings className="w-5 h-5" />
            <span>Profile</span>
          </NavLink>

          <button
            onClick={logOut}
            className="flex items-center gap-3 w-full px-5 py-3 mt-2 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-rose-500 transition-all duration-300"
          >
            <GrLogout className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
