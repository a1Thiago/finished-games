import { Request, Response } from "express"
import { db } from "../connectDB"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const querySelectEmail = "SELECT * FROM users WHERE email = ?"
const querySelectUsername = "SELECT * FROM users WHERE username = ?"


export function register(req: Request, res: Response) {

  if (Object.entries(req.body).length !== 3) return res.status(509).json('All fields are required!')

  const { username, email, password } = req?.body

  if (!username || !email || !password) return res.status(509).json('All fields are required!')
  // const querySelectEmail = "SELECT * FROM users WHERE email = ?"
  db.query(querySelectEmail, [email], (err: any, data: any) => {

    if (err) return res.status(500).json(err)
    if (data?.length) return res.status(509).json('This email is already registered!')
    // const querySelectUsername = "SELECT * FROM users WHERE username = ?"
    db.query(querySelectUsername, [username], (err: any, data: any) => {

      if (err) return res.status(500).json(err)
      if (data?.length) return res.status(509).json('This username is not available!')

      const salt = bcrypt.genSaltSync(10)

      const hashedPassWord = bcrypt.hashSync(password, salt)

      const queryInsertUser = "INSERT INTO users (`username`, `email`,`password`) VALUE (?)"

      const values = [username, email, hashedPassWord]

      db.query(queryInsertUser, [values], (err, data) => {

        if (err) return res.status(500).json(err)

        return res.status(200).json('User has been created.')
      })
    })
  })
}


export function login(req: Request, res: Response) {

  if (Object.entries(req.body).length !== 2) return res.status(509).json('All fields are required!')

  const { username } = req?.body

  if (!username || !req.body.password) return res.status(509).json('All fields are required!')

  db.query(querySelectUsername, [username], (err: any, data: any) => {

    if (err) return res.status(500).json(err)
    if (data?.length === 0) return res.status(404).json('Wrong password or username!')

    const checkPassword = bcrypt.compareSync(req.body.password, data[0].password)

    if (!checkPassword) return res.status(400).json("Wrong password or username!")

    const token = jwt.sign({ id: data[0].id }, '//changeSecretKey')

    const { password, ...others } = data[0]

    return res.cookie('accessToken', token, {
      httpOnly: true
    }).status(200).json(others)
  })
}


export function logout(req: Request, res: Response) {

  return res.clearCookie('accessToken', {
    secure: true,
    sameSite: 'none'
  }).status(200).json('User has been logged out.')

}