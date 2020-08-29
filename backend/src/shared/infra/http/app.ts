import 'reflect-metadata';

import express, { Express, Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';

import AppError from '@shared/errors/AppError';
import routes from './routes';

import '@shared/infra/typeorm';
import '@shared/container';

class App {
  public app: Express;

  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.middlewares();
    this.routes();
    this.errors();
  }

  middlewares() {
    this.app.use(cors());
  }

  routes() {
    this.app.use(routes);
  }

  errors() {
    this.app.use(
      (err: Error, request: Request, response: Response, _: NextFunction) => {
        if (err instanceof AppError) {
          return response
            .status(err.statusCode)
            .json({ status: 'error', message: err.message });
        }

        console.error(err);
        return response.status(500).json({
          status: 'error',
          message: 'Internal server error',
        });
      },
    );
  }
}

export default new App().app;
