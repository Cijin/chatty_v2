const express = require('express');
const app = express();
const apiRouter = require('./api/api');
const path = require('path');

const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const errorHandler = require('errorhandler');

const baseDir = path.resolve(__dirname, "");
const distDir = path.join(baseDir, "/dist");
//this is temporary, retrieving styles like this
const styleDir = path.join(baseDir, "/public/css");

const PORT = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));

//apiRouter here
app.use('/api', apiRouter);
app.use(errorHandler());

//there's got to be a better way to do this?
app.get("/public/css/style.css", (req, res) => {
    res.sendFile(path.join(styleDir, "/style.css"))
})

app.get("/public/css/reset.css", (req, res) => {
    res.sendFile(path.join(styleDir, "/reset.css"))
})

app.get("/dist/bundle.js", (req, res) => {
    res.sendFile(path.join(distDir, "/bundle.js"))
})

app.get("*", (req, res) => {    
    res.sendFile(path.join(baseDir, "/index.html"));
});

app.listen(PORT, () => {
    console.log(`Server listening on Port ${PORT}`);
});

module.exports = app;