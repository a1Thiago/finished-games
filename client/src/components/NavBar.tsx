import { makeRequest } from "../utils/axios"
import { useContext } from "react"
import { AuthContext } from "../contexts/AuthContext"

import { useNavigate } from "react-router-dom";


export default function NavBar() {

  const { currentUser } = useContext(AuthContext)

  const navigate = useNavigate()

  const handleLogOut = () => {
    localStorage.clear()
    makeRequest.post('/api/auth/logout')
    navigate('/')
    navigate(0)
  }

  return (
    <div className="bg-slate-800 text-black">
      {currentUser && <button onClick={handleLogOut}>Logout</button>}
      {!currentUser && <button onClick={() => navigate('/login')}>Login</button>}
      {!currentUser && <button onClick={() => navigate('/register')}>Register</button>}
    </div>
  )
}