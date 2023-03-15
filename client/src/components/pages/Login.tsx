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

    const fixRef = (ref: any) => ref?.current?.children[0].children[1]?.value //TODO

    const inputs = {
      username: fixRef(usernameRef) as string,
      password: fixRef(passwordRef) as string,
    }

    try {
      await login(inputs)

      setCredentialsCheck('Loading...')

    } catch (error) {
      setCredentialsCheck((loginError?.invalidCredentials ?? loginError?.requiredFields))

    }
  }

  return (

    <div className="m-auto p-4 grid gap-4 max-w-lg bg-white shadow-custom">
      <Heading ><h2 className="text-center">Log In</h2></Heading>

      <Text className="text-blue-700">{credentialsCheck}</Text>

      <div ref={usernameRef}>
        <InputLabel label="Username" type="text" placeholder="userName" />
      </div>

      <div ref={passwordRef} >
        <InputLabel label="Password" type="password" placeholder="**********" />
      </div>

      <div className="text-center">
        <Button label="Login" onClick={handleLogin} type="primary" />
      </div>

    </div>
  )
}