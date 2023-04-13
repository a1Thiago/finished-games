import { createContext, useEffect, useState, ReactNode } from 'react'
import axios from 'axios'

const url = `${import.meta.env.VITE_PRODUCTION_BACK_URL}/api/auth/login`


type AuthContextProps = {
  children: ReactNode
}

type AuthContextType = {
  currentUser: string | null
  login: (inputs: object) => void | Promise<any>
  loginError: {
    invalidCredentials?: string,
    requiredFields?: string
  } | null
}

const AuthContextInitial = {
  currentUser: null,
  login: (inputs: object) => { },
  loginError: null
}

export const AuthContext = createContext<AuthContextType>(AuthContextInitial)

export const AuthContextProvider = ({ children }: AuthContextProps) => {

  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user') as string) || null)

  const [loginError, setLoginError] = useState(null)

  const login = async (inputs: object) => {

    setLoginError(null)

    try {
      const res = await axios.post(url, inputs, {
        withCredentials: true
      })

      setTimeout(() => {
        setCurrentUser(res.data)
      }, 3000);

    } catch (error: any) {
      setLoginError(error?.response?.data)
      throw new Error(error);

    }

  }

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(currentUser))
  }, [currentUser])


  return (
    <AuthContext.Provider value={{ currentUser, login, loginError }}>
      {children}
    </AuthContext.Provider>
  )


} 