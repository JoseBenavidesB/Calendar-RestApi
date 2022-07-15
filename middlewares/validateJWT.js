const { response } = require("express");
const jwt = require('jsonwebtoken');

const validateJWT = (req, res = response, next) => {

    // x-token heades
    const token = req.header('x-token');

    if ( !token ) {
        return res.status(401).json({
            msg: "there is not any token"
        });
    }

    try {

        const { uid, name} = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED
        );

        req.uid = uid;
        req.name = name;
        
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            msg: "Not valid Token"
        });
    }

    next();
};

module.exports = {
    validateJWT,
}