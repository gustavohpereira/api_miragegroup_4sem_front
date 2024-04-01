import './App.css'
import Dashboard from './components/DashBoard/Dashboard'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
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
    element: <div className='flex w-full'><Sidebar></Sidebar><Dashboard/></div>
  }
])

function App() {
  

  return (
  <div className='flex w-full'>
    <RouterProvider router = {router}/>
  </div>
  )
}

export default App
