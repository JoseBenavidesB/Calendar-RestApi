const { response } = require('express');
require('dotenv').config();

const express = require('express');

// express app
const app = express();

//Routes
app.use('/api/auth', require('./routes/auth') );

//Public directory
app.use( express.static('public') );


// listen
app.listen( process.env.PORT, () => {
    console.log(`Listen on port ${process.env.PORT}`);
});