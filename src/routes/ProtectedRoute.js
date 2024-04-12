import { useAuth } from '../contexts/AuthContext'
import {
    createBrowserRouter,
    Navigate,
    Outlet,
    RouterProvider
  } from 'react-router-dom'

export const ProtectedRoute = () => {
    const { token } = useAuth()

    if(!token) {
        return <Navigate to="/login" />
    }

    return <Outlet />
}