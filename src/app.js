import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { userRoutes } from './routes/userRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/users', userRoutes)

export { app };