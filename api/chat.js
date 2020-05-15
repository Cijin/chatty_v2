const express = require('express');
const chatRouter = express.Router();
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');

const messageRouter = require('./message');

//for deleting specific messages based on tableName
chatRouter.use('/:tableName/:messageId', messageRouter);

chatRouter.get('/:tableName', (req, res, next) => {
    const tableName = req.params.tableName;
    db.all(`SELECT * FROM ${tableName}`, (error, messages) => {
        if (error) {
            next(error);
        }
        res.status(200).json({ messages: messages });
    });
});

//post request with chatTable Name in the parameter
chatRouter.post('/:tableName', (req, res, next) => {
    const tableName = req.params.tableName;
    const message = req.body.message;
    const time = req.body.time;
    const sql = 'INSERT INTO $tableName (messages, time) VALUES ' + 
        '($message, $time);';
    const values = {
        $tableName: tableName,
        $message: message,
        $time: time,
    };
    db.run(sql, values, function(error) {
        if (error) {
            next(error);
        }
        return db.get('SELECT * FROM $tableName WHERE id = $id', {
            $tableName: tableName,
            $id: this.lastID,
        }, (error, message) => {
            if (error) {
                next(error);
            }
            return res.status(201).json({ message: message });
        });
    });
});


module.exports = chatRouter;