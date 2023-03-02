import { Request, Response } from "express"
import { db } from "../connectDB"

const querySelectUserID = "SELECT * FROM games WHERE userid = ?"
const querySelectGameID = "SELECT * FROM games WHERE id = ?"

export function allGames(req: Request, res: Response) {

  const { userId } = req?.params

  db.query(querySelectUserID, userId, (error: any, data: any) => {
    res.send(data)
  })
}

export function singleGame(req: Request, res: Response) {

  const { gameId } = req?.params

  db.query(querySelectGameID, gameId, (error: any, data: any) => {
    res.send(data)
  })
}
