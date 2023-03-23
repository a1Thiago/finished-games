import { Request, Response } from "express"
import { db } from "../connectDB"

const querySelectUserID = "SELECT * FROM users WHERE id = ?"

export function userProfile(req: Request, res: Response) {

  const { userId } = req?.params

  db.query(querySelectUserID, userId, (error: any, data: any) => {

    delete data[0].id
    delete data[0].password
    delete data[0].email

    res.send(data)
  })

}