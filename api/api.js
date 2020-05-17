const express = require('express');
const apiRouter = express.Router();
const contactsRouter = require('./contacts');

apiRouter.use('/contacts', contactsRouter);

module.exports = apiRouter;