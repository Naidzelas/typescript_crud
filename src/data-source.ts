import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { config } from './config';
import { Client } from './entity/Client';

export const AppDataSource = new DataSource({
  type: 'mssql',
  host: config.database.server,
  port: config.database.port,
  username: config.database.user,
  password: config.database.password,
  database: config.database.database,
  synchronize: true, // false in production
  logging: false,
  entities: [Client],
  options: { 
    encrypt: true,
    trustServerCertificate: true
  }
});
