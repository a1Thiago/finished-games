import { Request, Response, NextFunction } from "express"
import { db } from "../connectDB.js"
import jwt from 'jsonwebtoken'
import { RequestWithUserInfo } from "routes/games.js"

const connection = await db as any

const querySelectUserID: string = "SELECT * FROM games WHERE userid = ?"
const querySelectGameID: string = "SELECT * FROM games WHERE id = ? AND userid = ?"

const querySelectGame = 'SELECT * FROM games WHERE id = ?'
const queryAddGame: string = 'INSERT INTO games (`title`,`cover`,`hours`,`dateOfFinish`,`added`,`userid`) VALUES (?)'
const queryEditGame: string = 'UPDATE games SET `title` = ?,`cover` = ?,`hours` = ?,`dateOfFinish` = ?, `lastModified` = ? WHERE id = ? AND userid = ?'
const queryDeleteGame: string = `DELETE FROM games WHERE id = ? AND userid = ?;`


export async function allGames(req: RequestWithUserInfo, res: Response) {

  const userId = req?.userInfo?.id

  connection.query(querySelectUserID, [userId], (error: any, data: any) => {
    if (error) {
      return res.status(404).json(error).end()
    } else {
      return res.status(200).json(data).end()
    }
  })

}

export async function singleGame(req: RequestWithUserInfo, res: Response) {

  const { gameId } = req?.params

  const userId = req?.userInfo?.id

  connection.query(querySelectGameID, [gameId, userId], (error: any, data: any) => {
    if (error) {
      return res.status(404).json(error).end()
    } else {
      return res.status(200).json(data).end()
    }
  })

}

export async function addGame(req: RequestWithUserInfo, res: Response) {

  const { body } = req

  const userId = req?.userInfo?.id

  const added = new Date()

  const values = [
    body.title,
    body.cover,
    body.hours,
    body.dateOfFinish,
    added,
    userId
  ]

  connection.query(queryAddGame, [values], (err: any, data: any) => {
    if (err) {
      return res.status(404).json(err).end()
    } else {
      return res.status(200).json({ insertId: data.insertId, message: 'Game created' }).end()
    }
  })
}


export async function editGame(req: RequestWithUserInfo, res: Response) {

  const userId = req?.userInfo?.id

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

  connection.query(querySelectGame, [gameId], (err: any, data: any) => {

    if (!data?.[0]) return res.status(400).json({ Unauthorized: "Invalid request" }).end()

    if (data?.[0]?.userId === userId) {
      connection.query(queryEditGame, [...values, gameId, userId], (err: any, data: any) => {
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
}

export async function deleteGame(req: RequestWithUserInfo, res: Response) {

  const { gameId } = req.params

  const userId = req?.userInfo?.id

  connection.query(querySelectGame, [gameId], (err: any, data: any) => {

    if (!data?.[0]) return res.status(400).json({ Unauthorized: "Invalid request" }).end()

    if (data?.[0]?.userId === userId) {
      connection.query(queryDeleteGame, [gameId, userId], (err: any, data: any) => {
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
}




