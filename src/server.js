import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';


import { router } from './utils/router.js';
import { logger } from './middlewares/logger.js';
import { auth } from './middlewares/auth.js';
import { rateLimit } from './middlewares/rateLimit.js';


dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT;

app.use(logger);
app.use(auth);
app.use(rateLimit);

app.use(router);



app.listen(PORT,()=>{
    console.log(`API Gateway is running on port ${PORT}`);
})