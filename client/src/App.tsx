import './App.css'
import { Navigate, Outlet, createBrowserRouter } from "react-router-dom"
import Games from "@components/pages/Games"
import AddGame from "./components/pages/AddGame"
import EditGame from "./components/pages/EditGame"
import Home from "@components/pages/Home"
import Login from "./components/pages/Login"
import Register from "./components/pages/Register"
import { RouterProvider } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "./contexts/AuthContext"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import NavBar from "./components/Header"
import Footer from '@components/Footer'

export function App() {

  const { currentUser } = useContext(AuthContext)

  const queryClient = new QueryClient()

  function ProtectedUser({ children }: any | React.ReactNode | JSX.Element) {//edit

    if (!currentUser) {
      return <Navigate to='/login' />
    }
    return children
  }

  function Layout() {
    return (
      <QueryClientProvider client={queryClient}>
        <div className='min-h-screen flex flex-col'>
          <NavBar />
          <div className='bg-blue-700 flex-1'>
            <div className='max-w-7xl m-auto'>
              <Outlet />
            </div>
          </div>
          <Footer />
        </div>
      </QueryClientProvider>
    )
  }

  const router = createBrowserRouter([

    {
      path: '/games',
      element:
        (<ProtectedUser>
          <Layout />
        </ProtectedUser>),
      children: [
        {
          path: '/games', element: <Games />
        },
        {
          path: '/games/add', element: <AddGame />
        },
        {
          path: '/games/edit/:id', element: <EditGame />
        },

      ]
    },

    {
      path: '/', element: <Layout />, children: [{ path: '/', element: <Home /> }]
    },
    {
      path: '/login', element: (!currentUser ? <Login /> : <Navigate to={'/games'} />)
    },
    {
      path: '/register', element: (!currentUser ? <Register /> : <Navigate to={'/'} />)
    },
    {
      path: '*', element: <Navigate to={'/'} />
    },

  ])


  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}