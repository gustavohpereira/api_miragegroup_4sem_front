import './App.css'
import Dashboard from './components/DashBoard/Dashboard'
import HeaderComponent from './components/HeaderComponent'
import Login from './components/Login/Login'
import PageWrapper from './components/PageWrapper/pageWrapper'
import Register from './components/Register/Register'
import { AddUserComponent } from './components/addUser/addUserComponent'
import NewRoom from './components/newroom'
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
    element: <PageWrapper><Dashboard></Dashboard></PageWrapper>
  },
  {
    path: '/addUser',
    element: <PageWrapper><AddUserComponent></AddUserComponent></PageWrapper>
  },
  {
    path: '/newRoom',
    element: <PageWrapper><NewRoom></NewRoom></PageWrapper>
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
