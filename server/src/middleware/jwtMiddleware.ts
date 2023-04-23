import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

interface IDecode {
  iat: number,
  id: number
}
export interface RequestWithUserInfo extends Request {
  userInfo?: IDecode,
}

export function verifyJWT(req: RequestWithUserInfo, res: Response, next: NextFunction) {

  console.log(req.cookies)

  const token = req.headers['x-access-token'] as string

  if (!token) {
    return res.status(401).json({ notLoggedIn: 'Not logged in!' })
  }
  jwt.verify(token, process.env.JWT_SECRET_KEY || 'never hardcode the secret key', (error: any, userInfo: any) => {
    if (error) {
      return next(error)
    }
    req.userInfo = userInfo
    next()
  })
}

export function handleInvalidTokenError(err: Error, req: Request, res: Response, next: NextFunction) {
  if (err.name === 'JsonWebTokenError') {
    return res.status(403).json({ invalidToken: 'Token is not valid' })
  }
  next(err)
}
