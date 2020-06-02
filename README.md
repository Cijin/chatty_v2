# chatty_v2
 
 About:

Chatty is a chat application project started by me. The idea behind the project is to practice my full stack capabilities. it also helps me find out the kinks in my knowledge.

It has been a project of mixed emotions for me, and continues to be as I am writing this documentation. Althoug, I'm very glad I took up the project.

You might have asked, where's version one. Version one denotes my failure, I almost gave up on the project as I made some disastorous decisions upon creation of the project. 

I decided to restart the project from scratch, as it gave me a breath of fresh air. Since then the project has far surpassed version one, although it's still in it's infancy.

Tech Stack: 
    
Front-End: React, Typescript, Css
Back-End: NodeJs, Express, SqLite
Bundler: Webpack
Packages: npm
Version-Control: Git

Documentation: 

Installation: 
    1. Run npm install to install dependencies
    2. npm start creates the dist folder and webpack bundle 
    3. Run node api/migrations/migration.js (creates neccessary tables)
    4. (Optional) Run node api/migrations/seed.js to add some data 
    3. Run node server.js to start server on localhost:4000
    4. Open http://localhost:4000 to view application

File Structure:

api: 
    1. Contains api Routes
        i. api.js -- contains express middleware and routes further to chat and contacts.
        ii. chat.js -- is the api for each individual chat table and deals with data manipulation for individual chats.
        iii. contacts.js -- router for all contacts, adds new contact tables when new contacts are added (open file for further info).
    2. Migration files to create database if running locally
        i. createContact.js -- creates table for new contacts
        ii. migration.js -- creates the contacts table
        iii. seed.js -- seeds tables with data for testing purposes

dist: contains bundle.js(created by webpack)

node_modules: contains dependencies

public:
    1. Contains styles for index.html
    2. Reset.css (resets default css properties)             

src:
    1.Components : React  components
        i. App
        ii. Contacts --- the contacts holder for the app
        iii. Messages --- component that renders individual chats
            Further divided into three components
            a. Message component --- for holding individual texts
            b. InputArea component --- for typing new texts, also contains the send button
    2. Shared : holds types (at the moment only contains one type --- contact)
    3. Util : contains helper functions to fetch (get & post) data from and to the database
    4. index.tsx: index file that renders the app

test: contains seed data for test database and test files

database.sqlite: sqlite database that holds all data

index.html: the html files that is run when server starts

webpack.config.js: webpack config file

Testing:

1. Run node test/seed.js (this will seed the test database)
2. Run npm test (this will run the mocha test suite in the console)