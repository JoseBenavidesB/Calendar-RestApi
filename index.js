const { response } = require('express');
require('dotenv').config();

const express = require('express');
const { dbConnection } = require('./database/config');

// express app
const app = express();

//Database
dbConnection();

//Public directory
app.use( express.static('public') );

// Read and Parse Body
app.use( express.json() );

//Routes
app.use('/api/auth', require('./routes/auth') );

// listen
app.listen( process.env.PORT, () => {
    console.log(`Listen on port ${process.env.PORT}`);
});