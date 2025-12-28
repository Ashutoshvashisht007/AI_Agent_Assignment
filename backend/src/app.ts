import express from 'express';
import bodyParser from 'body-parser';
import chatRoutes from './routes/chat.routes';
import dotenv from "dotenv";
import cors from 'cors';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '1mb' }));

app.use('/chat', chatRoutes);

export default app;