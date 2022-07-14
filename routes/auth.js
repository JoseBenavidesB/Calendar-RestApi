const { Router, application, response } = require('express');
const router = Router();

router.get('/', (req, res = response ) => {
    res.json({ msg:"hi from router"})
});


module.exports = router;