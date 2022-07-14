const { response } = require('express');
const express = require('express');

// express app
const app = express();


//routes

app.get('/', (req, res = response) => {
    res.json({ msg:"hello"})
})

// listen
app.listen( 4000, () => {
    console.log(`Listen on port ${4000}`);
});