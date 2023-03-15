import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom";
import Heading from "@ui/Heading/Heading";
import Text from "@ui/Text/Text";
import InputLabel from '@ui/InputLabel/InputLabel'
import Button from "@components/ui/Button/Button";
import { makeRequest } from "@utils/axios";
import TextLink from "@components/ui/TextLink/TextLink";

const url = 'http://localhost:8000/api/auth/register'


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

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>): Promise<any> => {

    e.preventDefault()

    setFilledAllFields('')

    setUserNameCheck('')
    setEmailCheck('')
    setPassWordCheck('')

    const fixRef = (ref: any) => ref?.current?.children[0].children[1]?.value //TODO

    const inputs = {
      username: fixRef(usernameRef) as string,
      password: fixRef(passwordRef) as string,
      email: fixRef(emailRef) as string,
    }

    try {

      const res = await makeRequest.post(url, inputs)

      setUserCreated(res.data.success)

      setTimeout(() => {
        navigate('/login')
      }, 3000)

    } catch (error: any) {

      const ObjError = error.response.data

      if (Object.keys(ObjError).includes('requiredFields')) setFilledAllFields(ObjError.requiredFields)
      setUserNameCheck(ObjError.invalidUserName ?? ObjError.unavailableUserName)
      if (Object.keys(ObjError).includes('invalidPassWord')) setPassWordCheck(ObjError.invalidPassWord)
      setEmailCheck(ObjError.invalidEmail ?? ObjError.unavailableEmail)
    }

  }

  return (
    <div className="m-auto p-4 grid gap-4 max-w-lg bg-white shadow-custom">
      <Heading ><h2 className="text-center">Register</h2></Heading>

      <Text className="text-redAlert-100">{filledAllFields}</Text>
      {userCreated && <Text size="md" className="text-blue-700">{userCreated} <TextLink size="md" className="text-blue-700" href="/login">Click to login</TextLink> </Text>}

      <div ref={usernameRef}>
        <InputLabel label="Username" type="text" placeholder="userName" invalid={userNameCheck} />
      </div>

      <div ref={passwordRef} >
        <InputLabel label="Password" type="password" placeholder="**********" invalid={passWordCheck} />
      </div>

      <div ref={emailRef} >
        <InputLabel label="Email" type="email" placeholder="example@example.com" invalid={emailCheck} />
      </div>

      <div className="text-center">
        <Button label="Register" onClick={handleClick} type="primary" />
      </div>

    </div>

  )
}