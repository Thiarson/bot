import express from "express";

const app = express();

app.get("/", (req, res) => {
    res.json({
        code: 200,
        status: "success",
        data: null,
    })
});

export default app;
