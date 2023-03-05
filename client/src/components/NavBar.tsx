import { makeRequest } from "../utils/axios"
import { useContext } from "react"
import { AuthContext } from "../contexts/AuthContext"

import { Navigate, useNavigate } from "react-router-dom";


export default function NavBar() {
  const { currentUser } = useContext(AuthContext)

  const navigate = useNavigate()

  const handleLogOut = () => {
    navigate('/')
    localStorage.clear()
    makeRequest.post('/api/auth/logout')
  }

  return (
    <div className="bg-slate-800 text-white">
      {currentUser && <button onClick={handleLogOut}>Logout</button>}
      {!currentUser && <button><Navigate to={'/login'} />Login</button>}
      {!currentUser && <button><Navigate to={'/register'} />Register</button>}
    </div>
  )
}