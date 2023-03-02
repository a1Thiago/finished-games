import { Request, Response } from "express"
import { db } from "../connectDB"

const querySelectUserID = "SELECT * FROM users WHERE id = ?"

// export function getUser(req: Request, res: Response) {

//   res.send('it works')
// }

export function userProfile(req: Request, res: Response) {

  const { userId } = req?.params

  db.query(querySelectUserID, userId, (error: any, data: any) => {
    res.send(data)
  })

}