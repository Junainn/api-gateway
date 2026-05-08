import Redis from "ioredis";

const redis = new Redis();

redis.on("connect", () => {
    console.log("Redis connected");
});

export default redis;