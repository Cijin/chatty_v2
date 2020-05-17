const express = require('express');
const contactsRouter = express.Router();
const chatRouter = require('./chat');
//As table for each contact is created dynamically 
//when new contacts are added
//this method below facilitates that.
const createContactTable = require('./migrations/createContact');

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');


contactsRouter.use('/chat', chatRouter);

//returns all current contact
//when page loads initially
contactsRouter.get('/', (req, res, next) => {
    const sql = 'SELECT * FROM contacts';
    db.all(sql, (error, contacts) => {
        if (error) {
            next(error);
        }
        res.status(200).json({ contacts: contacts });
    });
});

//create new table on addition of new contact
//new table of name [username][row-id] 
contactsRouter.post('/', (req, res, next) => {
    const name = req.contact.name;
    const email = req.contact.email;

    if (!name || !email) {
        res.sendStatus(400);
    }
    
    const sql = 'INSERT INTO contacts (contact_name, contact_email)' +
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
        const rowId = this.lastID;
        const newId = rowId + name;
        const newTableSql = 'UPDATE contacts SET contact_table_id = $newId' +
            'WHERE id = $id;';
        const newValues = {
            $newId: newId,
            $id: rowId,
        };
        //calling the function in migration to create a table for the new contact
        //the table name is the the contact_table_id
        createContactTable(newId);

        db.run(newTableSql, newValues, function(error) {
            if (error) {
                next(error);
            }
            return db.get('SELECT * FROM contacts WHERE id = $id;', {
                $id: rowId,
            }, (error, contact) => {
                if (error) {
                    next(error);
                }
                return res.status(201).json({ contact: contact });
            });
        });
    });
});

module.exports = contactsRouter;