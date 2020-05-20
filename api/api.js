const express = require('express');
const apiRouter = express.Router();
const contactsRouter = require('./contacts');
const chatRouter = require('./chat');

apiRouter.use('/contacts', contactsRouter);
apiRouter.use('/chat', chatRouter);

module.exports = apiRouter;