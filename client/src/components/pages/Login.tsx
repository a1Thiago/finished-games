import { useContext, useRef, useState } from "react"
import { AuthContext } from "@contexts/AuthContext"
import { useNavigate } from "react-router-dom";
import Heading from "@components/ui/Heading/Heading";
import Text from "@components/ui/Text/Text";
import Button from "@components/ui/Button/Button";
import InputLabel from "@components/ui/InputLabel/InputLabel";

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
    <>
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

      <div className="m-auto p-4 grid gap-4 max-w-lg bg-white shadow-custom">
        <Heading ><h2 className="text-center">Log In</h2></Heading>

        <Text className="text-redAlert-100">{credentialsCheck}</Text>

        <div ref={usernameRef}>
          <InputLabel label="Username" type="text" placeholder="userName" />
        </div>

        <div ref={passwordRef} >
          <InputLabel label="Password" type="password" placeholder="**********" />
        </div>

        <div className="text-center">
          <Button label="Register" onClick={handleLogin} type="primary" />
        </div>

      </div>s

    </>
  )
}