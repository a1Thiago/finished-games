import express from 'express'
import { allGames, singleGame, addGame, editGame, deleteGame } from '../controllers/games.js'

import { verifyJWT, handleInvalidTokenError } from '../middleware/jwtMiddleware.js'

const router = express.Router()

router.get('/all', verifyJWT, allGames)
router.get('/:gameId', verifyJWT, singleGame)
router.post('/add', verifyJWT, addGame)
router.put('/edit/:gameId', verifyJWT, editGame)
router.delete('/delete/:gameId', verifyJWT, deleteGame)

router.use(handleInvalidTokenError)

export default router
