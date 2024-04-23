import { useAuth } from '../contexts/AuthContext'
import Dashboard from '../components/DashBoard/Dashboard'
import Login from '../components/Login/Login'
import PageWrapper from '../components/PageWrapper/PageWrapper'
import Register from '../components/Register/Register'
import RoomList from '../components/RoomList/RoomList'
import { AddUserComponent } from '../components/UsersComponents/addUser/AddUserComponent'
import {
  createBrowserRouter,
  Navigate,
  RouterProvider
} from 'react-router-dom'
import { AdminRoute, AuthenticatedRoute } from './ProtectedRoutes'
import Logout from '../components/Logout/Logout'
import NewMeeting from '../components/meetingsComponents/NewMeeting/NewMeeting'
import ListMeetings from '../components/meetingsComponents/listMeetings/ListMeetings'
import UserList from '../components/UsersComponents/UserList/userList'
import EditUser from '../components/UsersComponents/editUser/editUser'
import UpdateMeeting from '../components/meetingsComponents/updateMeeting/updateMeeting'


const Routes = () => {
    const { token, user } = useAuth()

    const routesForNotAuthenticatedOnly = [
        {
            path: '/login',
            element: <div className='w-full'><Login/></div>
        }
    ]

    const routesForAuthenticatedOnly = [
        {
            path: '/',
            element: <AuthenticatedRoute />,
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
                    path: '/newRoom',
                    element: <PageWrapper><RoomList/></PageWrapper>
                },
                {
                    path: '/meetings',
                    element: <PageWrapper><ListMeetings/></PageWrapper>
                },
                {
                    path: '/Admin',
                    element: <PageWrapper><AddUserComponent></AddUserComponent><RoomList></RoomList></PageWrapper>
                },
                {
                    path: '/logout',
                    element: <Logout />
                },
                {
                    path: '/EditUser/:userId',
                    element: <PageWrapper><EditUser/></PageWrapper>
                },
                {
                    path: 'createMeeting',
                    element: <PageWrapper><NewMeeting/></PageWrapper>
                },
                {
                    path: 'updateMeeting/:meetingId',
                    element: <PageWrapper><UpdateMeeting></UpdateMeeting></PageWrapper>
                },
            ]
        }
    ]

    const routesForAdminOnly = [
        {
            path: '/',
            element: <AdminRoute />,
            children: [
                {
                    path: '/users',
                    element: <PageWrapper><UserList/></PageWrapper>
                },
                {
                    path: '/addUser',
                    element: <PageWrapper><AddUserComponent/></PageWrapper>
                },

            ]
        },
        

    ]

    const router = createBrowserRouter([
        ...(!token ? routesForNotAuthenticatedOnly : []),
        ...routesForAdminOnly,
        ...routesForAuthenticatedOnly,
    ])

    return <RouterProvider router={router} />
}



export default Routes