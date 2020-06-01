const express = require('express');
const contactsRouter = express.Router();
const chatRouter = require('./chat');
//As table for each contact is created dynamically 
//when new contacts are added
//this method below facilitates that.
const createContactTable = require('./migrations/createContact');

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');

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
//the new table will hold all the chats for that contact
//new table of name [username][row-id] 
contactsRouter.post('/', (req, res, next) => {
    const name = req.body.contact.name;
    const email = req.body.contact.email;

    if (!name || !email) {
        return res.sendStatus(400);
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

        const rowId = this.lastID;
        //to create new table name
        //regX just replaces spaces between name
        const tableName = name.replace(/[^A-Z0-9]/ig, "_") + rowId;
        const newTableSql = 'UPDATE contacts SET contact_table_id=$tableName ' +
            'WHERE id=$id;';
        const newValues = {
            $tableName: tableName,
            $id: rowId,
        };
        //calling the function in migrations to create a table for the new contact
        //the table name is the the contact_table_id
        createContactTable(tableName);        

        db.run(newTableSql, newValues, function(error) {
            if (error) {
                next(error);
            }
            db.get('SELECT * FROM contacts WHERE id=$id;', { $id: rowId }, 
            (error, contact) => {
                if (error) {
                    next(error);
                }                
                return res.status(201).json({ contact: contact });
            });
        });
    });
});

module.exports = contactsRouter;