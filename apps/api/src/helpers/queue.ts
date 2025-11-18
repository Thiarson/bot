import { Queue } from "bullmq";
import { redisConnection } from "src/database/redis";

export const cvQueue = new Queue("cv-processing", {
    connection: redisConnection,
});
