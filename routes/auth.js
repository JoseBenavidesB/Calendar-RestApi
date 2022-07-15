/*  
    User routes: / Auth
    host + /api/auth 
*/

const { Router,  response } = require('express');
const { check } = require('express-validator');

const { createUser, renewJWT, loginUser } = require('../controllers/auth');
const { fieldsValidator } = require('../middlewares/fieldsValidator');
const router = Router();

// create user
router.post('/create-user',[
    // middlewares
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is required').isEmail(),
    check('password', 'Password should have at least 5 characters').isLength({ min: 5 }),
    fieldsValidator,
],createUser)

// login
router.post('/', [
    check('email', 'Email is required').isEmail(),
    check('password', 'Password should have at least 5 characters').isLength({ min: 5 }),
    fieldsValidator,
],loginUser);

// renew JWT
router.get('/renew', renewJWT);


module.exports = router;