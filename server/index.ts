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

app.use(express.json())


app.get('/', (req: Request, res: Response) => {
    res.send('HOME');
});

app.get('/games', (req: Request, res: Response) => {

    const queryGames: string = `SELECT * FROM data.games;`

    db.query(queryGames, (err: any, data: any) => {

        if (err) {
            return res.status(404).json(err).end()
        } else {
            return res.status(200).json(data).end()
        }
    })
})


app.post('/add', (req: Request, res: Response) => {

    const queryGames = 'INSERT INTO games (`title`,`cover`,`hours`,`date`,`platform`,`link`) VALUES (?)'

    const { body } = req

    const values = [
        body.title,
        body.cover,
        body.hours,
        body.database,
        body.platform,
        body.link,
    ]

    db.query(queryGames, [values], (err: any, data: any) => {

        if (err) {
            return res.status(404).json(err).end()
        } else {
            return res.status(200).json('game created').end()
        }

    })

})



app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});


// {'id','title','cover','hours','date','platform','link'}
// 'id'
// 'title'
// 'cover'
// 'hours'
// 'date'
// 'platform'
// 'link'