import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom";
import { Heading } from "@ui/Heading"
import { Text } from "@ui/Text";
import { InputLabel } from "@ui/InputLabel"
import { Button } from "@ui/Button"
import { makeRequest } from "@utils/axios";
import { TextLink } from "@ui/TextLink";
import { ProgressBar } from "@components/ui/ProgressBar";

const url = `${import.meta.env.VITE_PRODUCTION_BACK_URL}/api/auth/register`

type Inputs = {
  username: string;
  password: string;
  email: string;
}

export default function Register() {

  const navigate = useNavigate()

  const [filledAllFields, setFilledAllFields] = useState<string>('')
  const [userCreated, setUserCreated] = useState<string>('')

  const [passWordCheck, setPassWordCheck] = useState<string>('')
  const [userNameCheck, setUserNameCheck] = useState<string>('')
  const [emailCheck, setEmailCheck] = useState<string>('')

  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const handleClick = async (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault()

    setFilledAllFields('')

    setUserNameCheck('')
    setEmailCheck('')
    setPassWordCheck('')

    const fixRef = (ref: React.RefObject<HTMLInputElement>) => (ref?.current?.children[0].children[1].children[1] as HTMLInputElement)?.value

    const inputs: Inputs = {
      username: fixRef(usernameRef),
      password: fixRef(passwordRef),
      email: fixRef(emailRef),
    }

    if (inputs.username === '' || inputs.password === '' || inputs.email === '') return setFilledAllFields('All fields are required!')

    setUserCreated('Loading...')

    try {
      const res = await makeRequest.post(url, inputs)
      setUserCreated(res.data.success)
      setTimeout(() => {
        navigate('/login')
      }, 3000)

    } catch (error: any) {

      setUserCreated('')
      const ObjError = error.response.data
      if (Object.keys(ObjError).includes('requiredFields')) setFilledAllFields(ObjError.requiredFields)
      setUserNameCheck(ObjError.invalidUserName ?? ObjError.unavailableUserName)
      if (Object.keys(ObjError).includes('invalidPassWord')) setPassWordCheck(ObjError.invalidPassWord)
      setEmailCheck(ObjError.invalidEmail ?? ObjError.unavailableEmail)
    }

  }

  return (

    <div className="grid gap-4 bg-white shadow-custom py-8 px-4 max-w-md w-full">

      <form onSubmit={handleClick}>

        <Heading ><h2 className="text-center">Register</h2></Heading>

        <Text className="text-redAlert-100">{filledAllFields}</Text>

        <div className="py-4">
          {userCreated === 'Loading...' ? <ProgressBar />
            : userCreated && <Text size="md" className="text-blue-700">{userCreated} <TextLink size="md" className="text-blue-700" href="/login">Click to login</TextLink> </Text>}
        </div>

        <div className="grid gap-4">
          <div ref={usernameRef}>
            <InputLabel label="Username" type="text" placeholder="userName" icon="userName" invalid={userNameCheck} autoComplete="username" required maxLength={45} />
          </div>

          <div ref={passwordRef} >
            <InputLabel label="Password" type="password" placeholder="**********" icon="password" invalid={passWordCheck} autoComplete="new-password" required maxLength={200} />
          </div>

          <div ref={emailRef} >
            <InputLabel label="Email" type="email" placeholder="example@example.com" icon="email" invalid={emailCheck} autoComplete="email" required maxLength={45} />
          </div>
        </div>
        <div className="text-center  mt-8">
          <Button label="Register" style="primary" />
        </div>
        <div className="text-center mt-4">
          <TextLink className="mobile:text-xs" href="/login">Already have an account? Log In.</TextLink>
        </div>
      </form>
    </div>

  )
}