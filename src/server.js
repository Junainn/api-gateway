import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';

import { metrics} from './metrics/metricsStore.js';
import { metricsMiddleware } from './middlewares/metrics.js';
import { router } from './utils/router.js';
import { logger } from './middlewares/logger.js';
import { auth } from './middlewares/auth.js';
import { rateLimit } from './middlewares/rateLimit.js';
import { startHealthChecks } from './health/healthChecker.js';
import { requestId } from './middlewares/requestId.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());


app.get("/metrics", (req, res) => {

    const averageLatency =
        metrics.totalRequests === 0
            ? 0
            : metrics.totalLatency / metrics.totalRequests;

    res.json({
        totalRequests: metrics.totalRequests,
        totalErrors: metrics.totalErrors,
        total429: metrics.total429,
        averageLatency: `${averageLatency.toFixed(2)}ms`,
        routes: metrics.routes
    });
});


const PORT = process.env.PORT;
app.use(metricsMiddleware);
app.use(requestId)
app.use(logger);
app.use(auth);
app.use(rateLimit);


app.use(router);


startHealthChecks()

app.listen(PORT,()=>{
    console.log(`API Gateway is running on port ${PORT}`);
})