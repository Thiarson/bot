import http from "node:http";

import app from "./app";
import { connectToMongo } from "database/mongo";
import { initSocketServer } from "./helpers/web-socket";

const server = http.createServer(app);
const port = 8080;

connectToMongo();
initSocketServer(server);

server.listen(port, () => {
    return console.log(`Server listening on port ${port}`);
});
