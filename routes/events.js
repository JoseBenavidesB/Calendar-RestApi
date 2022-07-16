/*  Events Routes
    /api/events
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { getEvents, createEvent, deleteEvent, updateEvent } = require("../controllers/events");
const { isDate } = require("../helpers/isDate");
const { fieldsValidator } = require("../middlewares/fieldsValidator");
const { validateJWT } = require("../middlewares/validateJWT");

const router = Router();
//CRUD

// ALL ROUTES NEED TOKEN
router.use( validateJWT );

// GET EVENTS
router.get('/', getEvents);

// Create Event
router.post('/', [
    check('title', "Title is REQUIRED").not().isEmpty(),
    check('start', 'Start Date REQUIRED').custom( isDate ),
    check('end', 'End Date REQUIRED').custom( isDate ),
    fieldsValidator
],createEvent);

// update Event
router.put('/:id', updateEvent);

// Delete Event
router.delete('/:id', deleteEvent);


module.exports = router;