import http from "node:http";

import app from "./app";
import { connectToMongo } from "database/mongo";

const server = http.createServer(app);
const port = 8080;

connectToMongo();

server.listen(port, () => {
    return console.log(`Server listening on port ${port}`);
});
