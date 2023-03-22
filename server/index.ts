import express, { Express, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import cookieParser from 'cookie-parser'

import usersRoutes from './routes/users'
import gamesRoutes from './routes/games'
import authRoutes from './routes/auth'

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use((req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Credentials', true as any)
  next()
})

app.use(express.json())
app.use(cors(
  {
    origin: ['http://localhost:5173', 'http://localhost:4173', 'http://localhost:6006']
  },
))

app.use(cookieParser())

app.use('/api/auth', authRoutes)
app.use('/api/users', usersRoutes)
app.use('/api/games', gamesRoutes)


app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
