import dotenv from "dotenv";

dotenv.config();

const jwtSecret = process.env.JWT_SECRET;
const frontendUrl = process.env.FRONTEND_URL;

export {
    jwtSecret,
    frontendUrl,
};
