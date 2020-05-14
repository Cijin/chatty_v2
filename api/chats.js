const express = require('express');
const chatsRouter = express.Router();
const messagesRouter = require('./messages');
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');


chatsRouter.use('/messages', messagesRouter);

//returns all current contact
//when page loads initially
chatsRouter.get('/', (req, res, next) => {
    const sql = 'SELECT * FROM chats';
    db.run(sql, (error, contacts) => {
        if (error) {
            next(error);
        }
        res.status(200).json({ contacts: contacts });
    });
});


module.exports = chatsRouter;