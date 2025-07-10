import express, { type Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import appRouter from './presentation/routes/index.routes';
import cookieParser from 'cookie-parser';


dotenv.config();

const app: Express = express();

app.use(cookieParser());

app.use(
    cors({
        origin: process.env.CORS_ORIGIN?.split(',') || '*',
        credentials: true,
}));

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

app.use(appRouter);


export default app;