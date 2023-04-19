import './App.css'
import { RouterProvider } from "react-router-dom"
import { Navigate, Outlet, createBrowserRouter } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "./contexts/AuthContext"
import { Games } from "@pages/Games"
import { AddGame } from "@pages/AddGame"
import { EditGame } from "@pages/EditGame"
import { Home } from "@pages/Home"
import { Login } from "@pages/Login"
import { Register } from "@pages/Register"
import { Header } from "@components/Header"
import { Footer } from '@components/Footer'

export function App() {

  const { currentUser } = useContext(AuthContext)

  function ProtectedUser({ children }: any | React.ReactNode | JSX.Element) {//edit

    if (!currentUser) {
      return <Navigate to='/login' />
    }
    return children
  }

  function Layout() {

    const globalPx = 'xsmobile:px-4 tablet:px-6 md:px-8'
    // const globalPx = ''

    return (

      <div className='min-h-screen flex flex-col'>
        <Header className={globalPx} />
        <div className='bg-blue-700 flex-1'>
          <div className={`max-w-7xl m-auto ${globalPx}`}>
            <Outlet />
          </div>
        </div>
        <Footer className={globalPx} />
      </div>

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
      path: '/login', element: <Layout />, children: [{ path: '/login', element: !currentUser ? <Login /> : <Navigate to={'/games'} /> }]
    },
    {
      path: '/register', element: <Layout />, children: [{ path: '/register', element: !currentUser ? <Register /> : <Navigate to={'/'} /> }]
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