process.env.PORT = 8081;
process.env.TEST_DATABASE = './test/test.sqlite';

const expect = require('chai').expect;
const request = require('supertest');
const sqlite3 = require('sqlite3');

const app = require('../server');
const seed = require('./seed');

const prodDb = new sqlite3.Database('./database.sqlite');
const testDb = new sqlite3.Database(process.env.TEST_DATABASE);

describe('Chats Table', function() {
    it('should exist', function(done) {
        prodDb.get("SELECT name FROM sqlite_master WHERE type = 'table' AND " +
        "name = 'chats';", (error, table) => {
            if (error || !table) {
                done(new Error(error || 'chats table not found'));
            }
            if (table) {
                done();
            }
        })
    });

    it('should have contact_table_id, contact_email, contact_name with ' + 
        'appropriate data types', function(done) {
            const sql = "INSERT INTO chats (contact_table_id, contact_email, contact_name) " +
                "VALUES ('Chat12', 'cijininurhood@gmail.com', 'Cijin Cherian');";
            prodDb.run(sql, function(error) {
                if (error) {
                    done(new Error(error));
                }
                else {
                    prodDb.run(`DELETE FROM chats WHERE id = ${this.lastID};`);
                    expect(this.lastID).to.exist;
                    done();
                }
            })
    });

    it('should have required contact_email column', function(done) {
        const sql = "INSERT INTO chats (contact_name)" +
                " VALUES ('Cijin Cherian');";
        prodDb.run(sql, function(error) {
            if (error && error.toString().includes('NOT NULL constraint failed')) {
                done();
            }
            else if (!error) {
                prodDb.run(`DELETE FROM chats WHERE id = ${this.lastID}`);
                done (new Error('chat without contact_email created.'));
            }
            else {
                done(new Error(error));
            }
        })
    });

    it('should have required contact_name column', function(done) {
        const sql = "INSERT INTO chats (contact_email)" +
                " VALUES ('cijininurhood@gmail.com');";
        prodDb.run(sql, function(error) {
            if (error && error.toString().includes('NOT NULL constraint failed')) {
                done();
            }
            else if (!error) {
                prodDb.run(`DELETE FROM chats WHERE id = ${this.lastID}`);
                done (new Error('chat without contact_name created.'));
            }
            else {
                done(new Error(error));
            }
        })
    });
});

