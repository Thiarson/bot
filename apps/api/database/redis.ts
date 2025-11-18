import { Redis } from "ioredis";
import { redisConfig } from "@config/redis.config";

export const redisConnection = new Redis({
    host: redisConfig.host,
    port: parseInt(redisConfig.port),
});

redisConnection.on("connect", () => {
    console.log("Redis connected");
});

redisConnection.on('error', (err) => {
  console.error('Redis error:', err);
});
