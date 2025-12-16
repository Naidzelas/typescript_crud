import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { config } from './config';
import { Client } from './entity/Client';
import { AppActivityLog } from './entity/AppActivityLog';
import { OutgoingRequest } from './entity/OutgoingRequest';

export const AppDataSource = new DataSource({
  type: 'mssql',
  host: config.database.server,
  port: config.database.port,
  username: config.database.user,
  password: config.database.password,
  database: config.database.database,
  synchronize: false, // Disabled to prevent automatic schema changes
  logging: false,
  entities: [Client, AppActivityLog, OutgoingRequest],
  options: { 
    encrypt: true,
    trustServerCertificate: true
  }
});
