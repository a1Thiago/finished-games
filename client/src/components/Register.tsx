import { useRef, useState } from "react"

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

    const data = {
      username: usernameRef?.current?.value as string,
      password: passwordRef?.current?.value as string,
      email: emailRef?.current?.value as string,
    }

    try {
      fetch(url,
        {
          method: 'POST',
          body: JSON.stringify(data),
          headers: { 'Content-type': 'application/json' }

        }).then(async (res) => {

          const resText = await res?.text()

          const resObj = JSON?.parse(resText)

          if (!res.ok) {

            if (Object.keys(resObj).includes('requiredFields')) setFilledAllFields(resObj.requiredFields)

            setUserNameCheck(resObj.invalidUserName ?? resObj.unavailableUserName)
            if (Object.keys(resObj).includes('invalidPassWord')) setPassWordCheck(resObj.invalidPassWord)
            setEmailCheck(resObj.invalidEmail ?? resObj.unavailableEmail)

            throw new Error(resText)
          }
          //CONFIRM
          return JSON.parse(resText)
        })

    } catch (error) {
      console.log(error)
      //ERROR MSG
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