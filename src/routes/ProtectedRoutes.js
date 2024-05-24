import { useAuth } from '../contexts/AuthContext'
import {
    createBrowserRouter,
    Navigate,
    Outlet,
    RouterProvider
  } from 'react-router-dom'

export const AuthenticatedRoute = () => {
    const { token } = useAuth()

    if(!token) {
        return <Navigate to="/login" />
    }

    return <Outlet />
}

export const AdminRoute = () => {
    const { token } = useAuth()
    const { user } = useAuth()

    if(!token) {
        return <Navigate to="/login" />
    }

    
    if(user.role !== "admin") {
        return <Navigate to="/dashboard" />
    }

    return <Outlet />
}