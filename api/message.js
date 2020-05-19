const express = require('express');
const messageRouter = express.Router();
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');

messageRouter.delete('/:tableName/:messageId', (req, res, next) => {
    const tableName = req.params.tableName;
    
    const sql = `DELETE FROM ${tableName} WHERE id = $messageId`;
    const values = {
        $messageId: req.params.messageId,
    };
    db.run(sql, values, (error) => {
        if (error) {
            next(error);
        }
        res.sendStatus(204);
    });
});

module.exports = messageRouter;