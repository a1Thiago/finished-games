import express from 'express';
import { allGames, singleGame, addGame, editGame, deleteGame } from '../controllers/games.js';

import { Request, Response, NextFunction } from "express"
import jwt from 'jsonwebtoken'


const router = express.Router()

export interface IDecode {
  iat: number,
  id: number
}

export interface RequestWithUserInfo extends Request {
  userInfo?: IDecode,
}

function verifyJWT(req: RequestWithUserInfo, res: Response, next: NextFunction) {

  console.log(req.headers['x-access-token'])

  const token = req.headers['x-access-token'] as string

  if (!token) return res.status(401).json({ notLoggedIn: 'Not logged in!' })

  jwt.verify(token, 'secretKey', (error: any, userInfo: any) => {

    if (error) {
      res.status(403).json({ invalidToken: 'Token is not valid' })
    } else {
      req.userInfo = userInfo
      next()
    }
  })
}

router.get('/all', verifyJWT, allGames)
router.get('/:gameId', singleGame)
router.post('/add', addGame)
router.put('/edit/:gameId', editGame)
router.delete('/delete/:gameId', deleteGame)

export default router