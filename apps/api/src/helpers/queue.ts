import { Queue } from "bullmq";
import { redisConnection } from "database/redis";

export const cvQueue = new Queue("cv-processing", {
    connection: redisConnection,
});
