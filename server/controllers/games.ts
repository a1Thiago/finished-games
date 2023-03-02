import { Request, Response } from "express"
import { db } from "../connectDB"

const querySelectUserID: string = "SELECT * FROM games WHERE userid = ?"
const querySelectGameID: string = "SELECT * FROM games WHERE id = ?"

const queryAddGame: string = 'INSERT INTO games (`title`,`cover`,`hours`,`date`,`platform`,`link`,`userid`) VALUES (?)'
const queryEditGame: string = 'UPDATE games SET `title` = ?,`cover` = ?,`hours` = ?,`date` = ?,`platform` = ?,`link` = ? WHERE id = ?'
const queryDeleteGame: string = `DELETE FROM games WHERE id = ?;`


export function allGames(req: Request, res: Response) {

  const { userId } = req?.params

  db.query(querySelectUserID, userId, (error: any, data: any) => {
    if (error) {
      return res.status(404).json(error).end()
    } else {
      return res.status(200).json(data).end()
    }
  })
}

export function singleGame(req: Request, res: Response) {

  const { gameId } = req?.params

  db.query(querySelectGameID, gameId, (error: any, data: any) => {
    if (error) {
      return res.status(404).json(error).end()
    } else {
      return res.status(200).json(data).end()
    }
  })
}

export function addGame(req: Request, res: Response) {

  const { userId } = req?.params

  const { body } = req

  const values = [
    body.title,
    body.cover,
    body.hours,
    body.database,
    body.platform,
    body.link,
    userId
  ]

  db.query(queryAddGame, [values], (err: any, data: any) => {

    if (err) {
      return res.status(404).json(err).end()
    } else {
      return res.status(200).json('game created').end()
    }
  })
}

export function editGame(req: Request, res: Response) {

  const { body } = req

  const { gameId } = req.params

  const values = [
    body.title,
    body.cover,
    body.hours,
    body.database,
    body.platform,
    body.link,
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

  db.query(queryDeleteGame, [gameId], (err: any, data: any) => {
    if (err) {
      return res.status(404).json(err).end()
    } else {
      return res.status(200).json('DELETe').end()
    }
  })
}
