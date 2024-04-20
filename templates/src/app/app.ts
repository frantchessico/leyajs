import express from "express";
import cors from 'cors';
import morgan from 'morgan';
import { router } from "./routes/app.routes";
import './database/mongodb'

const app = express();
app.use(express.json());
app.use(cors());
app.use('/api', router);
app.use(morgan('dev'));





export { app }