import { useContext } from "react"
import { AuthContext } from "../contexts/AuthContext"

export default function Login() {

  const { login } = useContext(AuthContext)

  const handleLogin = () => {
    login()
  }

  return (
    <div>Login

      <div>
        <label htmlFor="username">username</label>
        <input name="username" id="username" type="text" />
      </div>

      <div>
        <label htmlFor="password">password</label>
        <input name="password" id="password" type="text" />
      </div>

      <div>
        <label htmlFor="login">login</label>
        <button name="login" id="login" onClick={handleLogin}>login</button>
      </div>

    </div>
  )
}