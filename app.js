const express = require("express");
const env = require("dotenv");
const http = require("http");
const logger = require('morgan');
const path = require("path");
const cors = require('cors');
const routeProvider = require("./config/routes.config");

env.config();

const app = express();


if (process.env.NODE_ENV === "dev") {
    app.use(logger('dev'));
}

const server = http.createServer(app);

/**
 * Initialize the database
 */
const db = require("./config/database.config")();

if (process.env.NODE_ENV !== "test") {
    app.use(logger('dev'));
}

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());

app.use(routeProvider());

const port = process.env.OVERRIDE_PORT ?? (process.env.PORT || 4000);

module.exports = [server, app];
