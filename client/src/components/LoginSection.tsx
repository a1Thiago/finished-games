import { useContext, useRef, useState } from "react"
import { AuthContext } from "@contexts/AuthContext"
import Heading from "@ui/Heading/Heading";
import Text from "@ui/Text/Text";
import Button from "@ui/Button/Button";
import InputLabel from "@ui/InputLabel/InputLabel";
import TextLink from "@ui/TextLink/TextLink";

export default function Login() {

  const { login, loginError } = useContext(AuthContext)

  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [credentialsCheck, setCredentialsCheck] = useState<string | undefined>(loginError?.invalidCredentials ?? loginError?.requiredFields)

  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>): Promise<any> => {

    e.preventDefault()

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

    <div className="grid gap-4 bg-white shadow-custom py-8 px-4 max-w-md w-full">
      <Heading ><h2 className="text-center">Log In</h2></Heading>

      <Text className="text-blue-700">{credentialsCheck}</Text>

      <div ref={usernameRef}>
        <InputLabel label="Username" type="text" placeholder="userName" />
      </div>

      <div ref={passwordRef} >
        <InputLabel label="Password" type="password" placeholder="**********" />
      </div>

      <div className="text-center mt-8">
        <Button label="Login" onClick={handleLogin} type="primary" />
      </div>
      <div className="text-center mt-4">
        <TextLink className="mobile:text-xs" href="/register">Don't have an account? Sign up</TextLink>
      </div>
    </div>
  )
}