const express = require('express');
const chatsRouter = express.Router();
const chatRouter = require('./chat');
const createContactTable = require('./migrations/migration');
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');


chatsRouter.use('/chat', chatRouter);

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

//create new table on addition of new contact
//new table of name [username][row-id] 
chatsRouter.post('/', (req, res, next) => {
    const name = req.contact.name;
    const email = req.contact.email;

    if (!name || !email) {
        res.sendStatus(400);
    }
    
    const sql = 'INSERT INTO chats (contact_name, contact_email)' +
        'VALUES ($name, $email);';
    const values = {
        $name: name,
        $email: email,
    };

    db.run(sql, values, function(error) {
        if (error) {
            next(error);
        }
        //to create new table name
        const newId = this.lastID + name;
        const newTableSql = 'UPDATE chats SET contact_table_id = $newId' +
            'WHERE id = $id;';
        const newValues = {
            $newId: newId,
            $id: this.lastID,
        };
        //calling the function in migration to create a table for the new contact
        //the table name is the the contact_table_id
        createContactTable(newId);

        db.run(newTableSql, newValues, function(error) {
            if (error) {
                next(error);
            }
            return db.get('SELECT * FROM chats WHERE id = $id;', {
                $id: this.lastID,
            }, (error, chat) => {
                if (error) {
                    next(error);
                }
                return res.status(201).json({ chat: chat });
            });
        });
    });
});

module.exports = chatsRouter;