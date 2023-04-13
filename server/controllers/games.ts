import { Request, Response } from "express"
import { db } from "../connectDB.js"
import jwt from 'jsonwebtoken'

const connection = await db as any

const querySelectUserID: string = "SELECT * FROM games WHERE userid = ?"
const querySelectGameID: string = "SELECT * FROM games WHERE id = ? AND userid = ?"

const querySelectGame = 'SELECT * FROM games WHERE id = ?'
const queryAddGame: string = 'INSERT INTO games (`title`,`cover`,`hours`,`dateOfFinish`,`added`,`userid`) VALUES (?)'
const queryEditGame: string = 'UPDATE games SET `title` = ?,`cover` = ?,`hours` = ?,`dateOfFinish` = ?, `lastModified` = ? WHERE id = ? AND userid = ?'
const queryDeleteGame: string = `DELETE FROM games WHERE id = ? AND userid = ?;`


export async function allGames(req: Request, res: Response) {

  console.log(req.cookies.accessToken)
  console.log(req.cookies)
  console.log(req)

  const token = req.cookies.accessToken

  if (!token) return res.status(401).json({ notLoggedIn: 'Not logged in!' })

  jwt.verify(token, 'secretKey', (error: any, userInfo: any) => {

    if (error) res.status(403).json({ invalidToken: 'Token is not valid' })

    connection.query(querySelectUserID, [userInfo.id], (error: any, data: any) => {

      if (error) {
        return res.status(404).json(error).end()
      } else {
        return res.status(200).json(data).end()
      }
    })
  })
}

export async function singleGame(req: Request, res: Response) {

  const { gameId } = req?.params

  const token = req.cookies.accessToken

  if (!token) return res.status(401).json({ notLoggedIn: 'Not logged in!' })

  jwt.verify(token, 'secretKey', (error: any, userInfo: any) => {

    if (error) res.status(403).json({ invalidToken: 'Token is not valid' })

    connection.query(querySelectGameID, [gameId, userInfo.id], (error: any, data: any) => {

      if (error) {
        return res.status(404).json(error).end()
      } else {
        return res.status(200).json(data).end()
      }
    })

  })

}

export async function addGame(req: Request, res: Response) {

  const { body } = req

  const token = req.cookies.accessToken

  if (!token) return res.status(401).json({ notLoggedIn: 'Not logged in!' })

  jwt.verify(token, 'secretKey', (error: any, userInfo: any) => {

    if (error) res.status(403).json({ invalidToken: 'Token is not valid' })

    const added = new Date()

    const values = [
      body.title,
      body.cover,
      body.hours,
      body.dateOfFinish,
      added,
      userInfo.id
    ]

    connection.query(queryAddGame, [values], (err: any, data: any) => {

      if (err) {
        return res.status(404).json(err).end()
      } else {
        return res.status(200).json({ insertId: data.insertId, message: 'Game created' }).end()
      }
    })

  })
}

export async function editGame(req: Request, res: Response) {

  const token = req.cookies.accessToken

  if (!token) return res.status(401).json({ notLoggedIn: 'Not logged in!' })

  const { body } = req

  const { gameId } = req.params

  const lastModified = new Date()

  const values = [
    body.title,
    body.cover,
    body.hours,
    body.dateOfFinish,
    lastModified
  ]

  jwt.verify(token, 'secretKey', (error: any, userInfo: any) => {

    connection.query(querySelectGame, [gameId], (err: any, data: any) => {

      if (!data?.[0]) return res.status(400).json({ Unauthorized: "Invalid request" }).end()

      if (data?.[0]?.userId === userInfo?.id) {
        connection.query(queryEditGame, [...values, gameId, userInfo.id], (err: any, data: any) => {
          if (err) {
            return res.status(404).json(err).end()
          } else {
            return res.status(200).json({ message: 'Game edited' }).end()
          }
        })
      } else {
        return res.status(403).json({ Forbidden: "Invalid user" }).end()
      }
    })
  })
}

export async function deleteGame(req: Request, res: Response) {

  const { gameId } = req.params

  const token = req.cookies.accessToken

  if (!token) return res.status(401).json({ notLoggedIn: 'Not logged in!' })

  jwt.verify(token, 'secretKey', (error: any, userInfo: any) => {

    if (error) res.status(403).json({ invalidToken: 'Token is not valid' })

    connection.query(querySelectGame, [gameId], (err: any, data: any) => {

      if (!data?.[0]) return res.status(400).json({ Unauthorized: "Invalid request" }).end()

      if (data?.[0]?.userId === userInfo?.id) {
        connection.query(queryDeleteGame, [gameId, userInfo.id], (err: any, data: any) => {
          if (err) {
            return res.status(404).json(err).end()
          } else {
            return res.status(200).json({ deletedId: gameId, message: 'Game deleted' }).end()
          }
        })
      } else {
        return res.status(403).json({ Forbidden: "Invalid user" }).end()
      }
    })
  })
}



