import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
const mysql = require('mysql2');


dotenv.config();

const app: Express = express();
const port = process.env.PORT;

const db = mysql.createConnection({
    host: 'localhost',
    user: 'finishedGames',
    password: 'finished-games123',
    database: 'data'
})


app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
});

app.get('/games', (req: Request, res: Response) => {

    const queryGames = 'SELECT * FROM data.games;'

    db.query(queryGames, (err: {}, data: []) => {
        if (err) {
            return res.json(err)
        } else {
            return res.json(data)
        }
    })
})

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});