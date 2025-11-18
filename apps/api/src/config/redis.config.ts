if (!process.env.REDIS_HOST || !process.env.REDIS_PORT) {
    throw new Error("Missing Redis env configuration");
}

const redisConfig = {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
};

export { redisConfig };
