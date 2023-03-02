import { useRef, useState } from "react"
import axios from "axios"

const url = 'http://localhost:8000/api/auth/register'


export default function Register() {

  const [filledAllFields, setFilledAllFields] = useState<string>('')

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

    const inputs = {
      username: usernameRef?.current?.value as string,
      password: passwordRef?.current?.value as string,
      email: emailRef?.current?.value as string,
    }

    try {

      const res = await axios.post(url, inputs);
      //{ success: 'User has been created.' } /TODO
    } catch (error: any) {

      const ObjError = error.response.data

      if (Object.keys(ObjError).includes('requiredFields')) setFilledAllFields(ObjError.requiredFields)
      setUserNameCheck(ObjError.invalidUserName ?? ObjError.unavailableUserName)
      if (Object.keys(ObjError).includes('invalidPassWord')) setPassWordCheck(ObjError.invalidPassWord)
      setEmailCheck(ObjError.invalidEmail ?? ObjError.unavailableEmail)
    }

  }

  return (
    <div>Register
      <p>{filledAllFields}</p>
      <div>
        <label htmlFor="username">username</label>
        <input name="username" id="username" type="text" ref={usernameRef} />
        <p>{userNameCheck}</p>
      </div>

      <div>
        <label htmlFor="password">password</label>
        <input name="password" id="password" type="password" ref={passwordRef} />
        <p>{passWordCheck}</p>
      </div>

      <div>
        <label htmlFor="email">email</label>
        <input name="email" type="email" ref={emailRef} />
        <p>{emailCheck}</p>
      </div>

      <div>
        <label htmlFor="enter">enter</label>
        <button name="enter" id="enter" onClick={handleClick}>enter</button>
      </div>

    </div>

  )
}