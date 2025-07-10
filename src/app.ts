import express, { type Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import appRouter from './presentation/routes/index.routes';
import cookieParser from 'cookie-parser';


dotenv.config();

const app: Express = express();

const corsOptions = {
  origin: 'https://store-stuff-ui.vercel.app',
  credentials: true, // Allow cookies, authorization headers, etc.
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

app.use(cookieParser());


app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

app.use(appRouter);


export default app;