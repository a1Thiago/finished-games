import mysql from 'mysql2'


export const db = mysql.createConnection({
  host: 'localhost',
  user: 'finishedGames',
  password: 'finished-games123',
  database: 'finishedgamesdata'

})

