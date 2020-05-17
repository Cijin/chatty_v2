process.env.TEST_DATABASE = './test/test.sqlite';
process.env.PORT = 8081;

const expect = require('chai').expect;
const request = require('supertest');
const sqlite3 = require('sqlite3');

const app = require('../server');
const seed = require('./seed');

const prodDb = new sqlite3.Database('./database.sqlite');
const testDb = new sqlite3.Database(process.env.TEST_DATABASE);

describe('Contacts Table', function() {
    it('should exist', function(done) {
        prodDb.get("SELECT name FROM sqlite_master WHERE type = 'table' AND " +
        "name = 'contacts';", (error, table) => {
            if (error || !table) {
                done(new Error(error || 'contacts table not found'));
            }
            if (table) {
                done();
            }
        })
    });

    it('should have contact_table_id, contact_email, contact_name with ' + 
        'appropriate data types', function(done) {
            const sql = "INSERT INTO contacts (contact_table_id, contact_email, contact_name) " +
                "VALUES ('Chat12', 'cijininurhood@gmail.com', 'Cijin Cherian');";
            prodDb.run(sql, function(error) {
                if (error) {
                    done(new Error(error));
                }
                else {
                    prodDb.run(`DELETE FROM contacts WHERE id = ${this.lastID};`);
                    expect(this.lastID).to.exist;
                    done();
                }
            })
    });

    it('should have required contact_email column', function(done) {
        const sql = "INSERT INTO contacts (contact_name)" +
                " VALUES ('Cijin Cherian');";
        prodDb.run(sql, function(error) {
            if (error && error.toString().includes('NOT NULL constraint failed')) {
                done();
            }
            else if (!error) {
                prodDb.run(`DELETE FROM contacts WHERE id = ${this.lastID}`);
                done (new Error('chat without contact_email created.'));
            }
            else {
                done(new Error(error));
            }
        })
    });

    it('should have required contact_name column', function(done) {
        const sql = "INSERT INTO contacts (contact_email)" +
                " VALUES ('cijininurhood@gmail.com');";
        prodDb.run(sql, function(error) {
            if (error && error.toString().includes('NOT NULL constraint failed')) {
                done();
            }
            else if (!error) {
                prodDb.run(`DELETE FROM contacts WHERE id = ${this.lastID}`);
                done (new Error('chat without contact_name created.'));
            }
            else {
                done(new Error(error));
            }
        })
    });
});

describe('GET /api/contacts', function() {
    before(function(done) {
        seed.seedContactsDatabase(done);
    });
    it('should return all contacts in contacts', function() {
        return request(app)
            .get('/api/contacts')
            .then(function(response) {
                const contacts = response.body.contacts;
                expect(contacts.length).to.equal(2);
                expect(contacts.find(contact => contact.id === 1)).to.exist;
                expect(contacts.find(contact => contact.id === 2)).to.exist;
                expect(contacts.find(contact => contact.id === 3)).to.not.exist;                
            })            
    });

    it('should return status code of 200', function() {
        return request(app)
            .get('/api/contacts')
            .expect(200);
    })
});

describe('POST api/contacts', function() {
    let newContact;

    beforeEach(function(done) {
        newContact = {
            name: 'New Contact',
            email: 'newContact@email.com',            
        }
        seed.seedContactsDatabase(done);
    });

    it('should create a valid contact', function(done) {
        request(app)
            .post('/api/contacts/')
            .send({ contact: newContact })
            .then(function() {
                testDb.all('SELECT * FROM contacts', (error, contacts) => {
                    if (error) {
                        throw new Error(error);
                    }    
                    
                    const contact = contacts.find(contact => contact.contact_name === newContact.name);                                        
                    expect(contact).to.exist;
                    expect(contact.id).to.exist;
                    expect(contact.contact_email).to.equal('newContact@email.com');
                    done();
                });   
            }).catch(done);
    });

    it('should send a 201 response for valid request', function() {
        return request(app)
            .post('/api/contacts')
            .send({contact: newContact})
            .expect(201);
    });

    it('should send a 400 response for invalid requests', function() {
        const invalidContact = {
            name: 'Invalid',
        }
        return request(app)
            .post('/api/contacts/')
            .send({ contact: invalidContact })
            .expect(400);
    });

    it('should create contact table of name with value in column contact_table_id', function(done) {
        
        done();
    })
});
