
import { NavLink } from 'react-router-dom'
import { BsGraphUp, BsFillHouseAddFill } from 'react-icons/bs'
import { MdHomeWork, MdHotelClass } from 'react-icons/md'
import { FaUsers } from 'react-icons/fa'

const Menu = ({ role, viewMode }) => {
  const navItemStyle = ({ isActive }) =>
    `flex items-center gap-3 px-5 py-3 my-1 rounded-lg transition-all duration-300 ${
      isActive
        ? 'bg-gradient-to-r from-rose-400 to-pink-500 text-white shadow-md scale-[1.02]'
        : 'text-gray-600 hover:bg-gray-100 hover:text-rose-500'
    }`

  // Helper to render a NavLink easily
  const Item = ({ to, icon: Icon, text }) => (
    <NavLink to={to} className={navItemStyle} end>
      <Icon className="w-5 h-5" />
      <span>{text}</span>
    </NavLink>
  )

  // Common route for everyone
  const common = <Item to="/dashboard" icon={BsGraphUp} text="Statistics" />

  if (role === 'admin') {
    return (
      <>
        {common}
        <Item to="manage-users" icon={FaUsers} text="Manage Users" />
      </>
    )
  }

  if (role === 'host') {
    // If viewing as guest
    if (viewMode === 'guest') {
      return (
        <>
          {common}
          <Item to="mybooking" icon={MdHotelClass} text="My Booking" />
        </>
      )
    }
    // Normal host view
    return (
      <>
        {common}
        <Item to="addroom" icon={BsFillHouseAddFill} text="Add Room" />
        <Item to="mylistings" icon={MdHomeWork} text="My Listings" />
        <Item to="managebooking" icon={MdHotelClass} text="Manage Booking" />
      </>
    )
  }

  // Default guest
  return (
    <>
      {common}
      <Item to="mybooking" icon={MdHotelClass} text="My Booking" />
      <Item to="become-host" icon={BsFillHouseAddFill} text="Become a Host" />
    </>
  )
}

export default Menu
