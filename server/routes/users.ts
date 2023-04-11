import express from 'express';
import { userProfile } from '../controllers/users.js';

const router = express.Router()

router.get('/:userId', userProfile)

export default router