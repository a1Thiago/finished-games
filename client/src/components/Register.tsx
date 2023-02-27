import { useRef, useState } from "react"

const url = 'http://localhost:8000/api/auth/register'


export default function Register() {

  // const [validUsername, setValidUserName] = useState<boolean>(true)
  // const [availableUserName, setAvailableUserName] = useState<boolean>(true)

  // const [validEmail, setValidEmail] = useState<boolean>(true)
  // const [availableEmail, setAvailableEmail] = useState<boolean>(true)

  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>): Promise<any> => {

    e.preventDefault()

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

          if (!res.ok) {

            const text = await res.text()

            console.log(JSON.parse(text))

            throw new Error(text)
          }
          const text = await res.text()

          console.log(JSON.parse(text))

          return JSON.parse(text)
        })

    } catch (error) {
      console.log(error)
      //ERROR MSG
    }

  }

  return (
    <div>Register

      <div>
        <label htmlFor="username">username</label>
        <input name="username" id="username" type="text" ref={usernameRef} />
        {/* {!availableUserName && <p>This username is not available!</p>}
        {!validUsername && <p>This username is not valid!</p>} */}
      </div>

      <div>
        <label htmlFor="password">password</label>
        <input name="password" id="password" type="password" ref={passwordRef} />
      </div>

      <div>
        <label htmlFor="email">email</label>
        <input name="email" type="email" ref={emailRef} />
        {/* {!validEmail && <p>This email is invalid!</p>}
        {!availableEmail && <p>This email is already registered!</p>} */}
      </div>

      <div>
        <label htmlFor="enter">enter</label>
        <button name="enter" id="enter" onClick={handleClick}>enter</button>
      </div>

    </div>

  )
}