import { requestWithRetry } from '../config/axios.js';
import { getService } from './serviceRegistry.js';
import { getNextInstance } from './loadBalancer.js';
import { healthState } from '../health/healthState.js';
import {
    canRequest,
    recordFailure,
    recordSuccess
} from './circuitBreaker.js';


function extractService(url) {
    return url.split("/")[1];
}

export async function router(req, res) {
    const serviceName = extractService(req.originalUrl);
    const instances = await getService(serviceName);

    if (!instances || instances.length === 0) {
        return res.status(404).json({ error: "Service not found" });
    }

    let lastError = null;

    const healthyInstances = instances.filter(instance => {

        const state = healthState[instance];

        // If never checked yet → assume healthy
        if (!state) return true;

        return state.healthy;
    });

    if (healthyInstances.length === 0) {
        return res.status(503).json({
            error: "No healthy instances available"
        });
    }

    for (let i = 0; i < healthyInstances.length; i++) {
        const target = getNextInstance(serviceName, healthyInstances);

        try {
            const response = await requestWithRetry({
                method: req.method,
                url: `${target}${req.originalUrl}`,
                headers: {
                    ...req.headers,
                    "x-request-id": req.requestId
                },
                data: req.body
            });

            recordSuccess(target);

            return res.status(response.status).send(response.data);

        } catch (error) {
            recordFailure(target);
            lastError = error;

            console.warn(`Instance failed: ${target}`);
        }
    }

    return res.status(503).json({
        error: "All service instances unavailable"
    });
}