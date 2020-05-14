const express = require('express');
const messagesRouter = express.Router();

messagesRouter.param('contactId', (req, res, next, id) => {
    const sql = 'SELECT * FROM '
});


module.exports = messagesRouter;