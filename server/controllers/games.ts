import { Request, Response } from "express"

export function games(req: Request, res: Response) {

  res.send('it works')
}