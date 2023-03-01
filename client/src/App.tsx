// import './App.css'
import { Navigate, Outlet, Route, Routes, createBrowserRouter } from "react-router-dom"
import Games from "./components/Games"
import AddGame from "./components/AddGame"
import EditGame from "./components/EditGame"
import Home from "./components/Home"
import Login from "./components/Login"
import Register from "./components/Register"
import { RouterProvider } from "react-router-dom"


const currentUser: boolean = false

//EDIT
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
      // {
      //   path: '/', element: <Home />
      // },
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

export function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}