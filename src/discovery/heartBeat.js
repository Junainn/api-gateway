import redis from "../config/redis.js";

const TTL = 10;

export function startHeartbeat(
    serviceName,
    instanceUrl
) {

    const key =
    `service:${serviceName}|${instanceUrl}`;

    setInterval(async () => {

        await redis.set(
            key,
            "alive",
            "EX",
            TTL
        );

        console.log(
            `Heartbeat refreshed for ${instanceUrl}`
        );

    }, 5000);
}