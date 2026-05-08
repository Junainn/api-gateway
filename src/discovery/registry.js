import redis from "../config/redis.js";

const TTL = 10;

export async function registerService(
    serviceName,
    instanceUrl
) {

    const key =
    `service:${serviceName}|${instanceUrl}`;

    await redis.set(
        key,
        "alive",
        "EX",
        TTL
    );

    console.log(
        `Registered ${serviceName} -> ${instanceUrl}`
    );
}