import { Request, Response } from "express"
import { db } from "../connectDB"
import jwt from 'jsonwebtoken'

const querySelectUserID: string = "SELECT * FROM games WHERE userid = ?"
// const querySelectGameID: string = "SELECT * FROM games WHERE id = ?"
const querySelectGameID: string = "SELECT * FROM games WHERE id = ? AND userid = ?"

const queryAddGame: string = 'INSERT INTO games (`title`,`cover`,`hours`,`dateOfFinish`,`added`,`userid`) VALUES (?)'
const queryEditGame: string = 'UPDATE games SET `title` = ?,`cover` = ?,`hours` = ?,`dateOfFinish` = ?, `lastModified` = ? WHERE id = ?'
const queryDeleteGame: string = `DELETE FROM games WHERE id = ? AND userid = ?;`


export function allGames(req: Request, res: Response) {

  const token = req.cookies.accessToken

  if (!token) return res.status(401).json({ notLoggedIn: 'Not logged in!' })

  jwt.verify(token, 'secretKey', (error: any, userInfo: any) => {

    if (error) res.status(403).json({ invalidToken: 'Token is not valid' })

    db.query(querySelectUserID, [userInfo.id], (error: any, data: any) => {

      if (error) {
        return res.status(404).json(error).end()
      } else {
        return res.status(200).json(data).end()
      }
    })

  })

}

export function singleGame(req: Request, res: Response) {

  const { gameId } = req?.params

  const token = req.cookies.accessToken

  if (!token) return res.status(401).json({ notLoggedIn: 'Not logged in!' })

  jwt.verify(token, 'secretKey', (error: any, userInfo: any) => {

    if (error) res.status(403).json({ invalidToken: 'Token is not valid' })

    db.query(querySelectGameID, [gameId, userInfo.id], (error: any, data: any) => {

      if (error) {
        return res.status(404).json(error).end()
      } else {
        return res.status(200).json(data).end()
      }
    })

  })

}

export function addGame(req: Request, res: Response) {

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

    db.query(queryAddGame, [values], (err: any, data: any) => {

      if (err) {
        return res.status(404).json(err).end()
      } else {
        return res.status(200).json({ insertId: data.insertId, message: 'Game created' }).end()
      }
    })

  })
}

export function editGame(req: Request, res: Response) {

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

  db.query(queryEditGame, [...values, gameId], (err: any, data: any) => {
    if (err) {
      return res.status(404).json(err).end()
    } else {
      console.log(data)
      return res.status(200).json({ message: 'Game edited' }).end()
    }
  })
}

export function deleteGame(req: Request, res: Response) {

  const { gameId } = req.params

  const token = req.cookies.accessToken

  if (!token) return res.status(401).json({ notLoggedIn: 'Not logged in!' })

  jwt.verify(token, 'secretKey', (error: any, userInfo: any) => {

    if (error) res.status(403).json({ invalidToken: 'Token is not valid' })

    db.query(queryDeleteGame, [gameId, userInfo.id], (err: any, data: any) => {
      if (err) {
        return res.status(404).json(err).end()
      } else {
        console.log(data)
        return res.status(200).json({ message: 'Game deleted' }).end()
      }
    })
  })
}



