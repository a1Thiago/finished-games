import { useContext, useRef, useState } from "react"
import { AuthContext } from "@contexts/AuthContext"
import { Heading } from "@ui/Heading"
import { Text } from "@ui/Text";
import { Button } from "@ui/Button"
import { InputLabel } from "@ui/InputLabel";
import { TextLink } from "@ui/TextLink"

export default function LoginSection() {

  const { login, loginError } = useContext(AuthContext)

  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [credentialsCheck, setCredentialsCheck] = useState<string | undefined>(loginError?.invalidCredentials ?? loginError?.requiredFields)

  const handleClick = async (e: any) => {

    e.preventDefault()

    const fixRef = (ref: any) => ref?.current?.children[0].children[1].children[1]?.value //TODO

    const inputs = {
      username: fixRef(usernameRef) as string,
      password: fixRef(passwordRef) as string,
    }

    if (inputs.username === '' || inputs.password === '') return setCredentialsCheck('All fields are required!')

    try {
      await login(inputs)
      setCredentialsCheck('Loading...')
    } catch (error) {
      setCredentialsCheck((loginError?.invalidCredentials ?? loginError?.requiredFields))
    }
  }

  return (

    <div className="grid gap-4 bg-white shadow-custom py-8 px-4 max-w-md w-full">

      <form onSubmit={handleClick}>

        <Heading ><h2 className="text-center">Log In</h2></Heading>

        <Text className="text-redAlert-100">{credentialsCheck}</Text>
        <div className="grid gap-4">
          <div ref={usernameRef}>
            <InputLabel label="Username" type="text" placeholder="userName" icon="userName" autoComplete="username" required />
          </div>

          <div ref={passwordRef} >
            <InputLabel label="Password" type="password" placeholder="**********" icon="password" autoComplete="current-password" required />
          </div>

          <div className="text-center mt-8">
            <Button label="Login" style="primary" />
          </div>
          <div className="text-center mt-4">
            <TextLink href="/register" className="mobile:text-xs">Don't have an account? Sign up</TextLink>
          </div>
        </div>
      </form>
    </div>

  )
}