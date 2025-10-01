import http from "node:http";

import app from "./app";

const server = http.createServer(app);
const port = 8080;

server.listen(port, () => {
    return console.log(`Server listening on port ${port}`);
});
