/* eslint-disable no-mixed-spaces-and-tabs */
import express from 'express'
import 'reflect-metadata'
import createConnection from './database'
import { router as routes } from './routes'

class App {
  public express: express.Application;

  public constructor() {
  	this.express = express()

  	this.middlewares()

  	this.routes()

  	this.database()
  }

  private middlewares(): void {
  	this.express.use(express.json())
  }

  private routes(): void {
  	this.express.use(routes)
  }

  private database(): void {
  	createConnection()
  }
}

export default new App().express