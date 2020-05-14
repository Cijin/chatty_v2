const express = require('express');
const apiRouter = express.Router();
const chatsRouter = require('./chats');

apiRouter.use('/chats', chatsRouter);

module.exports = apiRouter;