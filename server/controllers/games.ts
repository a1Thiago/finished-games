import { Request, Response } from "express"
import { db } from "../connectDB"
import jwt from 'jsonwebtoken'

const querySelectUserID: string = "SELECT * FROM games WHERE userid = ?"
// const querySelectGameID: string = "SELECT * FROM games WHERE id = ?"
const querySelectGameID: string = "SELECT * FROM games WHERE id = ? AND userid = ?"

const queryAddGame: string = 'INSERT INTO games (`title`,`cover`,`hours`,`date`,`userid`) VALUES (?)'
const queryEditGame: string = 'UPDATE games SET `title` = ?,`cover` = ?,`hours` = ?,`date` = ? WHERE id = ?'//ADD USER ID
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

    const values = [
      body.title,
      body.cover,
      body.hours,
      body.date,
      userInfo.id
    ]

    db.query(queryAddGame, [values], (err: any, data: any) => {
      if (err) {
        return res.status(404).json(err).end()
      } else {
        return res.status(200).json('Game created').end()
      }
    })

  })
}

export function editGame(req: Request, res: Response) {

  const { body } = req

  const { gameId } = req.params

  const values = [
    body.title,
    body.cover,
    body.hours,
    body.date,
  ]

  db.query(queryEditGame, [...values, gameId], (err: any, data: any) => {
    if (err) {
      return res.status(404).json(err).end()
    } else {
      return res.status(200).json('edit').end()
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
        return res.status(200).json('DELETe').end()
      }
    })
  })
}



