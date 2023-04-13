import mysql from 'mysql2'
import dotenv from 'dotenv';
import { Client } from 'ssh2';

dotenv.config();

const sshClient = new Client();

const dbServer = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
}

const tunnelConfig = {
  host: process.env.SSH_HOST,
  port: process.env.SSH_PORT,
  username: process.env.SSH_USER,
  privateKey: process.env.SSH_KEY
}

const forwardConfig = {
  srcHost: dbServer.host,
  srcPort: dbServer.port,
  dstHost: dbServer.host,
  dstPort: dbServer.port
};

export const db = new Promise((resolve, reject) => {

  sshClient.on('ready', () => {
    sshClient.forwardOut(
      forwardConfig.srcHost as string,
      forwardConfig.srcPort as any,
      forwardConfig.dstHost as string,
      forwardConfig.dstPort as any,
      (err: any, stream: any) => {
        if (err) reject(err);
        const updatedDbServer = {
          ...dbServer,
          stream
        };
        const connection = mysql.createConnection(updatedDbServer as any)

        connection.connect((error) => {
          if (error) {
            reject(error);
          }
          resolve(connection);
        });
      });
  }).connect(tunnelConfig as any);
});


