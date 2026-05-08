import {metrics} from "../metrics/metricsStore.js";

export const metricsMiddleware = (req, res, next)=> {

    if(req.originalUrl === "/metrics"){
        return next();
    }

    const start = Date.now();

    metrics.totalRequests++;

    res.on('finish', () => {
        const duration = Date.now() - start;
        metrics.totalLatency += duration;

        if(res.statusCode >= 400){
            metrics.totalErrors++;
        }

        if(res.statusCode === 429){
            metrics.total429++;
        }

        const route = req.originalUrl;

        if(!metrics.routes[route]){
            metrics.routes[route] = {
                requests: 0,
                errors: 0,
                latency: 0
            };
        }

        metrics.routes[route].requests++;
        if(res.statusCode >= 400){
            metrics.routes[route].errors++;
        }
        metrics.routes[route].latency += duration;

        

    })
    next();
}