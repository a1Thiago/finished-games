import mysql from 'mysql2'
import dotenv from 'dotenv'
import { Client } from 'ssh2'

dotenv.config()

const sshClient = new Client()


interface DbServerConfig {
  host: string
  port: number
  user: string
  password: string
  database: string
}

type UpdatedDbServerConfig = DbServerConfig & {
  stream: any;
};

interface TunnelConfig {
  host: string
  port: number
  username: string
  privateKey: string
}

interface ForwardConfig {
  srcHost: string
  srcPort: number
  dstHost: string
  dstPort: number
}

const dbServer: DbServerConfig = {
  host: process.env.DB_HOST || '',
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USERNAME || '',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || '',
}

const tunnelConfig: TunnelConfig = {
  host: process.env.SSH_HOST || '',
  port: Number(process.env.SSH_PORT),
  username: process.env.SSH_USER || '',
  privateKey: process.env.SSH_KEY || '',
}

const forwardConfig: ForwardConfig = {
  srcHost: dbServer.host,
  srcPort: dbServer.port,
  dstHost: dbServer.host,
  dstPort: dbServer.port,
}

export const db = new Promise<mysql.Connection>((resolve, reject) => {
  sshClient.on('ready', () => {
    sshClient.forwardOut(
      forwardConfig.srcHost,
      forwardConfig.srcPort,
      forwardConfig.dstHost,
      forwardConfig.dstPort,
      (err: any, stream: any) => {
        if (err) {
          reject(err)
        } else {
          const updatedDbServer: UpdatedDbServerConfig = {
            ...dbServer,
            stream,
          }
          const connection = mysql.createConnection(updatedDbServer)

          connection.connect((error) => {
            if (error) {
              reject(error)
            } else {
              resolve(connection)
            }
          })
        }
      }
    )
  }).connect(tunnelConfig)
})


// import mysql from 'mysql2'
// import dotenv from 'dotenv'
// import { Client } from 'ssh2'

// dotenv.config()

// const sshClient = new Client()

// const dbServer = {
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   user: process.env.DB_USERNAME,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_DATABASE
// }

// const tunnelConfig = {
//   host: process.env.SSH_HOST,
//   port: process.env.SSH_PORT,
//   username: process.env.SSH_USER,
//   privateKey: process.env.SSH_KEY
// }

// const forwardConfig = {
//   srcHost: dbServer.host,
//   srcPort: dbServer.port,
//   dstHost: dbServer.host,
//   dstPort: dbServer.port
// }

// export const db = new Promise((resolve, reject) => {

//   sshClient.on('ready', () => {
//     sshClient.forwardOut(
//       forwardConfig.srcHost as string,
//       forwardConfig.srcPort as any,
//       forwardConfig.dstHost as string,
//       forwardConfig.dstPort as any,
//       (err: any, stream: any) => {
//         if (err) reject(err)
//         const updatedDbServer = {
//           ...dbServer,
//           stream
//         }
//         const connection = mysql.createConnection(updatedDbServer as any)

//         connection.connect((error) => {
//           if (error) {
//             reject(error)
//           }
//           resolve(connection)
//         })
//       })
//   }).connect(tunnelConfig as any)
// })


