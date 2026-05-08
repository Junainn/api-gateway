import redis from "../config/redis.js";

export async function getService(
    serviceName
) {

    const pattern =
        `service:${serviceName}|*`;

    const keys =
        await redis.keys(pattern);

    return keys.map(key => {

        const parts = key.split("|");

        return parts[1];

    });
}