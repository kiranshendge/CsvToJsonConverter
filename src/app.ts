import express from 'express';
import dotenv from 'dotenv';
import router from './routes/routes';

dotenv.config();

const app = express();

app.use('/api', router);

export default app;
