import { createContext, useEffect, useState, ReactNode } from 'react'

type AuthContextProps = {
  children: ReactNode
}

type AuthContextType = {
  currentUser: string | null
  login: () => void
}

export const AuthContext = createContext<AuthContextType | null>(null)

export const AuthContextProvider = ({ children }: AuthContextProps) => {

  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user') as string) || null)

  const login = () => {

  }

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(currentUser))
  }, [currentUser])


  return (
    <AuthContext.Provider value={{ currentUser, login }}>
      {children}
    </AuthContext.Provider>
  )


} 