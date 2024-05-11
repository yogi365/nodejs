const express = require('express');
const app = express();
app.listen('8080');

const htmlRoute = require('./src/routes/htmlroute');

app.use('/home',htmlRoute); 