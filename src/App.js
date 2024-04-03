import './App.css'
import Dashboard from './components/DashBoard/Dashboard'
import HeaderComponent from './components/HeaderComponent'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import { AddUserComponent } from './components/addUser/addUserComponent'
import Sidebar from './components/sidebar'
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <div className='w-full'><Login/></div>
  },
  {
    path: '/register',
    element: <div><Register/></div>
  },
  {
    path: '/dashboard',
    element: <div className='flex_start w-full'><Sidebar></Sidebar><div className='w-full'><HeaderComponent/><Dashboard/></div></div>
  },
  {
    path: '/addUser',
    element: <div className='flex_start w-full'><Sidebar></Sidebar><div className='w-full'><AddUserComponent/></div></div>
  }
])

function App() {
  

  return (
  <div>
    <RouterProvider router = {router}/>
  </div>
  )
}

export default App
