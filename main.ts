import Express from "express";
import Cors from "cors";
import dotenv from "dotenv";
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import path from 'path';
import morgan from 'morgan';

import prisma from "./prisma/prisma-client";
import swaggerSpec from './swagger';
import Routes from "./routes";

dotenv.config();

const app = Express();

// Setup real-time logging to a file
const logStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
app.use(morgan('combined', { stream: logStream }));

// Optional: Log to console as well
app.use(morgan('dev'));

app.use(Express.json());
app.use(Cors());

app.use('/api/v1', Routes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(8000, () => {
  prisma.$connect().then(() => {
    console.log("Connected to database");
  }).catch(err => {
    console.log("Connection to database failed", err);
  });
});
