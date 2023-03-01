// import './App.css'
import { Navigate, Outlet, createBrowserRouter } from "react-router-dom"
import Games from "./components/Games"
import AddGame from "./components/AddGame"
import EditGame from "./components/EditGame"
import Home from "./components/Home"
import Login from "./components/Login"
import Register from "./components/Register"
import { RouterProvider } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "./contexts/AuthContext"


// const currentUser = false

//EDIT

export function App() {

  console.log(useContext(AuthContext))

  const { currentUser } = useContext(AuthContext)

  function ProtectedUser({ children }: any | React.ReactNode | JSX.Element) {

    if (!currentUser) {
      return <Navigate to='/login' />
    }
    return children
  }


  function Layout() {
    return (
      <div>
        <h1>NAVBAR</h1>

        <Outlet />

        <h1>Footer</h1>
      </div>
    );
  }

  const router = createBrowserRouter([

    {
      path: '/',
      element: (<ProtectedUser><Layout /></ProtectedUser>),
      children: [
        {
          path: '/games', element: <Games />
        },
        {
          path: '/add', element: <AddGame />
        },
        {
          path: '/edit/:id', element: <EditGame />
        },

      ]
    },
    // {
    //   path: '/', element: <Home />
    // },
    {
      path: '/login', element: <Login />
    },
    {
      path: '/register', element: <Register />
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