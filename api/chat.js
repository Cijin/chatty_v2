const express = require('express');
const chatRouter = express.Router();
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');

//also handles /:tableName?messageId
chatRouter.get('/:tableName', (req, res, next) => {
    const tableName = req.params.tableName;
    const messageId = req.query.messageId;

    if (messageId) {
        const sql = `SELECT * FROM ${tableName} WHERE id=${messageId}`;
        db.get(sql, (error, message) => {
            if (error) {
                next(error);
            }
            res.status(200).json({ message: message });
        });
    }
    else {
        db.all(`SELECT * FROM ${tableName}`, (error, messages) => {
            if (error) {
                next(error);
            }
            res.status(200).json({ messages: messages });
        });
    }
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

//if no query is present the table of tableName will be deleted
chatRouter.delete('/:tableName', (req, res, next) => {
    const tableName = req.params.tableName;
    const messageId = req.query.messageId; 

    if (messageId) {
        const sql = `DELETE FROM ${tableName} WHERE id = ${messageId}`;
        db.run(sql, (error) => {
            if (error) {
                next(error);
            }
            res.sendStatus(204);
        });
    }
    else {
        const sql = `DROP TABLE IF EXISTS ${tableName}`;
        db.run(sql, (error) => {
            if (error) {
                next(error);
            }
            res.sendStatus(204);
        })
    }    
});


module.exports = chatRouter;