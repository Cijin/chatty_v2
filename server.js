const express = require('express');
const app = express();
const apiRouter = require('./api/api');
const path = require('path');
const serveStatic = require('serve-static');

const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const errorHandler = require('errorhandler');

const baseDir = path.resolve(__dirname, "./");
const PORT = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));

//apiRouter here
app.use('/api', apiRouter);
app.use(errorHandler());

app.get("*", (req, res) => {
    res.sendFile(path.join(baseDir, "/index.html"));
});

app.listen(PORT, () => {
    console.log(`Server listening on Port ${PORT}`);
});

module.exports = app;