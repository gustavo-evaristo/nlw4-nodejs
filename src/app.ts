import express from 'express';
import 'reflect-metadata';
import createConnection from './database';
import { router } from './routes';

createConnection()

const app = express()

.use(express.json())

.use(router)

export { app }