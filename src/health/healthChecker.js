import axios from "axios";

import { getService } from "../utils/serviceRegistry.js";
import { healthState } from "./healthState.js";

const FAILURE_THRESHOLD = 3;

async function getAllInstances() {

    const services = ["users", "products", "auth"];

    let instances = [];

    for (const service of services) {

        const serviceInstances =
            await getService(service) || [];

        instances.push(...serviceInstances);
    }

    return instances;
}


async function checkInstance(instance) {

    try {

        await axios.get(`${instance}/health`, {
            timeout: 2000
        });

        // SUCCESS
        healthState[instance] = {
            healthy: true,
            failures: 0
        };

        console.log(`HEALTHY: ${instance}`);

    } catch (error) {

        if (!healthState[instance]) {
            healthState[instance] = {
                healthy: true,
                failures: 0
            };
        }

        healthState[instance].failures++;

        console.warn(
            `Health check failed for ${instance} (${healthState[instance].failures})`
        );

        if (
            healthState[instance].failures >= FAILURE_THRESHOLD
        ) {

            healthState[instance].healthy = false;

            console.error(`UNHEALTHY: ${instance}`);
        }
    }
}


export function startHealthChecks() {

    console.log("Starting active health checks...");

    setInterval(async () => {

        const instances = await getAllInstances();

        for (const instance of instances) {

            await checkInstance(instance);
        }

    }, 5000);
}