const { response } = require('express');
require('dotenv').config();
const cors = require('cors');

const express = require('express');
const { dbConnection } = require('./database/config');

// express app
const app = express();

//Database
dbConnection();

// CORS
app.use( cors() );

//Public directory
app.use( express.static('public') );

// Read and Parse Body
app.use( express.json() );

//Routes
app.use('/api/auth', require('./routes/auth') );
app.use('/api/events', require('./routes/events') );

// listen
app.listen( process.env.PORT, () => {
    console.log(`Listen on port ${process.env.PORT}`);
});