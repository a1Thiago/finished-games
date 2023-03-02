import express from 'express';
import { allGames, singleGame } from '../controllers/games';

const router = express.Router()

router.get('/:userId/all', allGames)
router.get('/:gameId', singleGame)

export default router