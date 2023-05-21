const express = require("express");
const handle404Middleware = require("../middlewares/handle-404.middleware");
const ContactsController = require("../controllers/contacts.controller");

const apiRouter = express.Router();

// configuration
apiRouter.post('/contact', ContactsController.saveContact )

apiRouter.use("*", handle404Middleware);

module.exports = apiRouter;
