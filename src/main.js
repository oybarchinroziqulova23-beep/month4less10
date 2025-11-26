import express from 'express';
import { config } from 'dotenv';
config();

import { connectDB } from './config/db.js';
import router from './router/index.routes.js';

const app = express();
const PORT = Number(process.env.PORT);

app.use(express.json());
await connectDB();

app.use('/api', router);

app.listen(PORT, () => console.log('server running on port', PORT));
