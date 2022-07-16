/*  Events Routes
    /api/events
*/

const { Router } = require("express");
const { getEvents, createEvent, deleteEvent, updateEvent } = require("../controllers/events");
const { validateJWT } = require("../middlewares/validateJWT");

const router = Router();
//CRUD

// ALL ROUTES NEED TOKEN

// GET EVENTS
router.get('/', [validateJWT],getEvents);

// Create Event
router.post('/', validateJWT, createEvent);

// update Event
router.put('/:id', validateJWT, updateEvent);

// Delete Event
router.delete('/:id', validateJWT, deleteEvent);


module.exports = router;