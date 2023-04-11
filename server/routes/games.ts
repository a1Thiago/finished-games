import express from 'express';
import { allGames, singleGame, addGame, editGame, deleteGame } from '../controllers/games.js';

const router = express.Router()

router.get('/all', allGames)
router.get('/:gameId', singleGame)
router.post('/add', addGame)
router.put('/edit/:gameId', editGame)
router.delete('/delete/:gameId', deleteGame)

export default router