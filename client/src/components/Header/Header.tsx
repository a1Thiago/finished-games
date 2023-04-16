import { AuthContext } from "@contexts/AuthContext";
import { makeRequest } from "@utils/axios";
import { useContext } from "react"
import { useNavigate } from "react-router-dom";
import { Button } from "@ui/Button"
import { Heading } from "@ui/Heading"


type HeaderProps = {
  className?: string
}

export default function Header({ className }: HeaderProps) {

  const { currentUser } = useContext(AuthContext)

  const navigate = useNavigate()

  const handleLogOut = () => {
    localStorage.clear()
    makeRequest.post('/api/auth/logout')
    navigate(0)
  }

  return (
    <header className={`w-full bg-blue-100 h-24`}>
      <div className={`max-w-7xl m-auto grid grid-cols-2 items-center gap-6 h-full ${className}`} >
        <div className="flex gap-6">
          <Heading size="lg">
            <button onClick={() => navigate('/home')} className="px-1 py-0.5 cursor-pointer hover:opacity-90">
              <h2>Home</h2>
            </button>
          </Heading>
          {currentUser &&
            <Heading size="lg">
              <button onClick={() => navigate('/games')} className="px-1 py-0.5 cursor-pointer hover:opacity-90 ">
                <h2>My Games</h2>
              </button>
            </Heading>}
        </div>
        <div className="flex gap-6 justify-end w-full">
          {currentUser && <Button label="Log Out" onClick={handleLogOut} style="warn" />}
          {!currentUser && <Button label="Log In" onClick={() => navigate('/login')} style="secondary" />}
          {!currentUser && <Button label="Register" onClick={() => navigate('/register')} style="primary" />}
        </div>
      </div>
    </header>
  )
}