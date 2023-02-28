import { useRef, useState } from "react"

const url = 'http://localhost:8000/api/auth/register'


export default function Register() {

  const [filledAllFields, setFilledAllFields] = useState<string>('')

  const [validUserName, setValidUserName] = useState<string>('')
  const [availableUserName, setAvailableUserName] = useState<string>('')

  const [validPassWord, setValidPassWord] = useState<string>('')

  const [validEmail, setValidEmail] = useState<string>('')
  const [availableEmail, setAvailableEmail] = useState<string>('')

  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>): Promise<any> => {

    e.preventDefault()

    setFilledAllFields('')
    setValidUserName('')
    setValidPassWord('')
    setValidEmail('')

    setAvailableUserName('')
    setAvailableEmail('')

    const data = {
      username: usernameRef?.current?.value as string,
      password: passwordRef?.current?.value as string,
      email: emailRef?.current?.value as string,
    }

    // if (data.username.length < 3) setValidUserName(false)

    // if (!/\S+@\S+\.\S+/.test(data.email)) setValidEmail(false)

    // if (validEmail === false || validUsername === false) return

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
            if (Object.keys(resObj).includes('invalidUserName')) setValidUserName(resObj.invalidUserName)
            if (Object.keys(resObj).includes('invalidPassWord')) setValidPassWord(resObj.invalidPassWord)
            if (Object.keys(resObj).includes('invalidEmail')) setValidEmail(resObj.invalidEmail)

            if (Object.keys(resObj).includes('unavailableUserName')) setAvailableUserName(resObj.unavailableUserName)
            if (Object.keys(resObj).includes('unavailableEmail')) setValidEmail(resObj.unavailableEmail)

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
        <p>{validUserName}</p>
        <p>{availableUserName}</p>
      </div>

      <div>
        <label htmlFor="password">password</label>
        <input name="password" id="password" type="password" ref={passwordRef} />
        <p>{validPassWord}</p>
      </div>

      <div>
        <label htmlFor="email">email</label>
        <input name="email" type="email" ref={emailRef} />
        <p>{validEmail}</p>
        <p>{availableEmail}</p>
      </div>

      <div>
        <label htmlFor="enter">enter</label>
        <button name="enter" id="enter" onClick={handleClick}>enter</button>
      </div>

    </div>

  )
}