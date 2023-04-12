import mysql from 'mysql2'
import dotenv from 'dotenv';
import { Client } from 'ssh2';
import { readFileSync } from 'fs';

dotenv.config();

const sshClient = new Client();

const dbServer = {
  host: process.env.DB_HOST as string,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  port: 3307,
  database: 'finishedgamesdata'
}

const tunnelConfig = {
  host: process.env.DB_SSH_HOST,
  port: 22,
  username: process.env.DB_SSH_USER,
  privateKey: readFileSync('./docker-vm-key')
}

const forwardConfig = {
  srcHost: '127.0.0.1',
  srcPort: 3307,
  dstHost: dbServer.host,
  dstPort: dbServer.port
};

export const db = new Promise((resolve, reject) => {

  sshClient.on('ready', () => {
    sshClient.forwardOut(
      forwardConfig.srcHost,
      forwardConfig.srcPort,
      forwardConfig.dstHost,
      forwardConfig.dstPort,
      (err: any, stream: any) => {
        if (err) reject(err);
        const updatedDbServer = {
          ...dbServer,
          stream
        };
        const connection = mysql.createConnection(updatedDbServer)

        connection.connect((error) => {
          if (error) {
            reject(error);
          }
          resolve(connection);
        });
      });
  }).connect(tunnelConfig);
});

