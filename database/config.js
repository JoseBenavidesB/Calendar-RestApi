
const mongoose = require('mongoose');

const dbConnection = async() => {
    try {
        
        await mongoose.connect( process.env.DB_CNN );

        console.log("DB ONLINE");

    } catch (error) {
        console.log(error);
        throw new Error('ERROR TO CONNECT DB')
    }
};

module.exports = {
    dbConnection,
}