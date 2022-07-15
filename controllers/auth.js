const { response } = require("express");
const User = require("../models/User");
const bcrypt = require('bcryptjs');
const { generateJWT } = require("../helpers/createJWT");

//Login
const loginUser = async (req, res = response ) => {
    const { email, password } = req.body

    try {
        
        const user = await User.findOne({ email });

        if ( !user ) {
            return res.status(400).json({
                msg: "User doesn't exist - E"
            });
        };

        // check password
        const validPassword = bcrypt.compare( password, user.password );

        if ( !validPassword ){
            return res.status(400).json({
                msg: "Password wrong"
            });
        };

        //generate JWT
        const token = await generateJWT( user._id, user.name );

        res.json({ 
            msg: "User logged",
            uid: user._id,
            name: user.name,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Talk with the manager"
        })
    }
};

// Create User
const createUser = async (req, res = response ) => {
    const { email, password } = req.body


    try {

        let user = await User.findOne({ email });

        if ( user ) {
            return res.status(400).json({
                msg: "User already exist"
            });
        };

        user = new User( req.body );

        // Encrypt password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync( password, salt);

        await user.save();

        //generate JWT
        const token = await generateJWT( user._id, user.name );

        res.status(201).json({ 
            uid: user._id,
            name: user.name,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Talk with the manager"
        })
    }
};

// Renew JWT
const renewJWT = async(req, res = response ) => {

    const { uid, name } = req;

    // generate new JWT
    const token = await generateJWT( uid, name );


    res.json({ 
        token
    })
};

module.exports = {
    createUser,
    loginUser,
    renewJWT,
}