import dotenv from "dotenv";

dotenv.config();

const jwtSecret = process.env.JWT_SECRET;
const frontendUrl = process.env.FRONTEND_URL;
const agentUrl = process.env.AGENT_URL;
const internalApiKey = process.env.INTERNAL_API_KEY;

const requestTimeout = 5 * 1000 * 60; // 1 minute

export {
    jwtSecret,
    frontendUrl,
    agentUrl,
    internalApiKey,
    requestTimeout,
};
