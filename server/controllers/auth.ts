import { Request, Response } from "express"
import { db } from "../connectDB.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const connection = await db as any

const querySelectEmail = "SELECT * FROM users WHERE email = ?"
const querySelectUsername = "SELECT * FROM users WHERE username = ?"

interface ErrorMsg {
  invalidUserName?: string;
  invalidPassWord?: string
  invalidEmail?: string;
}

export async function register(req: Request, res: Response) {

  const errorMsg: ErrorMsg = {}

  if (Object.entries(req.body).length !== 3) return res.status(509).json({ requiredFields: 'All fields are required!' })

  const { username, email, password } = req?.body

  if (!username || !email || !password) return res.status(509).json({ requiredFields: 'All fields are required!' })

  if (username.length < 3 || !/^[a-zA-Z0-9.\-_$@*!]{3,30}$/.test(username)) errorMsg.invalidUserName = 'This username is not valid!'

  if (password.length < 6) errorMsg.invalidPassWord = 'This password is not valid!'

  if (!/\S+@\S+\.\S+/.test(email)) errorMsg.invalidEmail = 'This email is not valid!'

  if (Object.entries(errorMsg).length >= 1) return res.status(509).json(errorMsg)

  connection.query(querySelectEmail, [email], (err: any, data: any) => {

    if (err) return res.status(500).json(err)
    if (data?.length) return res.status(509).json({ unavailableEmail: 'This email is already registered!' })

    connection.query(querySelectUsername, [username], (err: any, data: any) => {

      if (err) return res.status(500).json(err)
      if (data?.length) return res.status(509).json({ unavailableUserName: 'This username is not available!' })

      const salt = bcrypt.genSaltSync(10)

      const hashedPassWord = bcrypt.hashSync(password, salt)

      const queryInsertUser = "INSERT INTO users (`username`, `email`,`password`) VALUE (?)"

      const values = [username, email, hashedPassWord]

      connection.query(queryInsertUser, [values], (err: any, data: any) => {

        if (err) return res.status(500).json(err)

        return res.status(200).json({ success: 'User has been created.' })
      })
    })
  })
}


export async function login(req: Request, res: Response) {

  function AddDays(days: number) {
    let today = new Date();
    let resultDate = new Date(today);
    resultDate.setDate(today.getDate() + days);
    return resultDate;
  }

  if (Object.entries(req.body).length !== 2) return res.status(509).json({ requiredFields: 'All fields are required!' })

  const { username } = req?.body

  if (!username || !req.body.password) return res.status(509).json({ requiredFields: 'All fields are required!' })

  connection.query(querySelectUsername, [username], (err: any, data: any) => {

    if (err) return res.status(500).json(err)
    if (data?.length === 0) return res.status(404).json({ invalidCredentials: "Wrong password or username!" })

    const checkPassword = bcrypt.compareSync(req.body.password, data[0].password)

    if (!checkPassword) return res.status(400).json({ invalidCredentials: "Wrong password or username!" })

    const token = jwt.sign({ id: data[0].id }, 'secretKey')

    const { password, ...others } = data[0]

    return res.cookie('accessToken', token, {
      sameSite: "none",
      secure: true,
      httpOnly: true,
      expires: AddDays(30)
    }).status(200).json({ ...others, token })
  })
}


export function logout(req: Request, res: Response) {


  //remove localStorage

  return res.clearCookie('accessToken', {
    secure: true,
    sameSite: 'none'
  }).status(200).json('User has been logged out.')

}