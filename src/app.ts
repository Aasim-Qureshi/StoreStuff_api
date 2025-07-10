import express, { type Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import appRouter from './presentation/routes/index.routes';
import cookieParser from 'cookie-parser';

dotenv.config();

const app: Express = express();

const corsOptions = {
  origin: [
    'https://store-stuff-ui.vercel.app',
    'https://store-stuff-ui-aasim-qureshis-projects.vercel.app',
    'https://store-stuff-ui-git-main-aasim-qureshis-projects.vercel.app'
  ],
  credentials: true,
};

// 👇 FIX: Handle preflight requests before any route
app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // <--- IMPORTANT for CORS to work

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(appRouter);

export default app;
