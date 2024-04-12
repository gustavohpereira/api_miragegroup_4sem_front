import { useAuth } from '../contexts/AuthContext'
import Dashboard from '../components/DashBoard/Dashboard'
import HeaderComponent from '../components/HeaderComponent'
import Login from '../components/Login/Login'
import PageWrapper from '../components/PageWrapper/pageWrapper'
import Register from '../components/Register/Register'
import RoomList from '../components/RoomList/RoomList'
import { AddUserComponent } from '../components/addUser/addUserComponent'
import NewRoom from '../components/newroom'
import Sidebar from '../components/sidebar'
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider
} from 'react-router-dom'
import { ProtectedRoute } from './ProtectedRoute'

const Routes = () => {
    const { token } = useAuth()

    const routesForNotAuthenticatedOnly = [
        {
            path: '/login',
            element: <div className='w-full'><Login/></div>
        }
    ]

    const routesForAuthenticatedOnly = [
        {
            path: '/',
            element: <ProtectedRoute />,
            children: [
                {
                    path: '/',
                    element: <Navigate to={"/dashboard"} />
                },
                {
                    path: '/dashboard',
                    element: <PageWrapper><Dashboard></Dashboard></PageWrapper>
                },
                {
                    path: '/register',
                    element: <div><Register/></div>
                },
                {
                    path: '/addUser',
                    element: <PageWrapper><AddUserComponent></AddUserComponent></PageWrapper>
                },
                {
                    path: '/Admin',
                    element: <PageWrapper><AddUserComponent></AddUserComponent><RoomList></RoomList></PageWrapper>
                }
            ]
        }
    ]

    const router = createBrowserRouter([
        ...(!token ? routesForNotAuthenticatedOnly : []),
        ...routesForAuthenticatedOnly
    ])

    return <RouterProvider router={router} />
}



export default Routes