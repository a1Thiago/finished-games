import express from 'express';
import { allGames, singleGame, addGame, editGame, deleteGame } from '../controllers/games';

const router = express.Router()

router.get('/:userId/all', allGames)
router.get('/:gameId', singleGame)
router.post('/:userId/add', addGame)
router.put('/edit/:gameId', editGame)
router.delete('/delete/:gameId', deleteGame)

export default router