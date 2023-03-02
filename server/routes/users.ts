import express from 'express';
import { userProfile } from '../controllers/users';

const router = express.Router()

router.get('/:userId', userProfile)

export default router