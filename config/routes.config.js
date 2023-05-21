const express = require("express");
const apiRouter = require("../routes/api-v1.routes");

function routeProvider(io) {
    const router = express.Router();

    router.use("/api", apiRouter);

    return router;
}

module.exports = routeProvider;
