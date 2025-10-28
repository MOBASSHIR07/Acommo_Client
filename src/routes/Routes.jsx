import { createBrowserRouter } from 'react-router-dom'
import Main from '../layouts/Main'
import Home from '../pages/Home/Home'
import ErrorPage from '../pages/ErrorPage'
import Login from '../pages/Login/Login'
import SignUp from '../pages/SignUp/SignUp'
import RoomDetails from '../pages/RoomDetails/RoomDetails'
import PrivateRoute from './PrivateRoute'
import DashBoardLayout from '../layouts/DashBoardLayout'
import Statistic from '../pages/Dashboard/Common/Statistic'
import AddRoom from '../pages/Dashboard/Host/AddRoom'
import MyListings from '../pages/Dashboard/Host/MyListings'
import Profile from '../pages/Dashboard/Common/Profile'
import ManageUsers from '../pages/Dashboard/Admin/ManageUsers '
import MyBooking from '../pages/Dashboard/Guest/MyBooking '
import BecomeHost from '../pages/Dashboard/Guest/BecomeHost '
import AdminRoute from './AdminRoute'
import HostRoute from './HostRoute'
import ManageBooking from '../pages/Dashboard/Host/ManageBooking'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/room/:id',
        element:<PrivateRoute>
           <RoomDetails />
        </PrivateRoute>,
      },
    ],
  },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <SignUp /> },
 {

    path: '/dashboard',
  element: <PrivateRoute>
    <DashBoardLayout />,
  </PrivateRoute>,
  children: [
    {
      index: true,
      element: <PrivateRoute>
        <Statistic />
      </PrivateRoute>,
    },
    {
      path: 'addroom',
      element: <PrivateRoute>
      <HostRoute>
          <AddRoom />, 
      </HostRoute>
      </PrivateRoute>
    },
    {
      path: 'mylistings',
      element: <PrivateRoute>
      <HostRoute>
          <MyListings />, 
      </HostRoute>
      </PrivateRoute>
    },
    {
      path: 'manage-users',
      element:<PrivateRoute>
        <AdminRoute>
           <ManageUsers />, 
        </AdminRoute>
      </PrivateRoute>
    },
    {
      path: 'mybooking',
      element: <PrivateRoute>
        <MyBooking />, 
      </PrivateRoute>
    },
    {
      path: 'managebooking',
      element: <PrivateRoute>
      <HostRoute>
        <ManageBooking/>
      </HostRoute>
      </PrivateRoute>
    },
    {
      path: 'become-host',
      element: <PrivateRoute>
        <BecomeHost />, 
      </PrivateRoute>
    },
    {
      path: 'profile',
      element: <PrivateRoute>
        <Profile />,
      </PrivateRoute>
    },
  ],
 }
])
