import { useContext, useRef, useState } from "react"
import { AuthContext } from "@contexts/AuthContext"
import { useNavigate } from "react-router-dom";

export default function Login() {

  const { login, loginError } = useContext(AuthContext)

  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [credentialsCheck, setCredentialsCheck] = useState<string | undefined>(loginError?.invalidCredentials ?? loginError?.requiredFields)

  const navigate = useNavigate()

  const handleLogin = async () => {
    const data = {
      username: usernameRef?.current?.value as string,
      password: passwordRef?.current?.value as string,
    }

    try {
      await login(data)
      setCredentialsCheck('')
      navigate('/games')
    } catch (error) {

      setCredentialsCheck((loginError?.invalidCredentials ?? loginError?.requiredFields))

    }
  }

  return (
    <div>Login
      {credentialsCheck}
      <div>
        <label htmlFor="username">username</label>
        <input name="username" id="username" type="text" ref={usernameRef} />
      </div>

      <div>
        <label htmlFor="password" >password</label>
        <input name="password" id="password" type="text" ref={passwordRef} />
      </div>

      <div>
        <label htmlFor="login">login</label>
        <button name="login" id="login" onClick={handleLogin}>login</button>
      </div>

    </div>
  )
}