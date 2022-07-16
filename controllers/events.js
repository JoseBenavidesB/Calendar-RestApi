/* asv */

const { response } = require("express");


const getEvents = (req, res = response) => {
    res.json({
        msg: "Hi from get Events"
    })
};

const createEvent = (req, res = response) => {
    res.json({
        msg: "Hi from Create EvENT"
    })
};

const updateEvent = ( req, res = response) => {
    res.json({
        msg: "hi from update"
    })
};

const deleteEvent = (req, res = response) => {
    
    res.json({
        msg: "Hi from DeleteEvent"
    })
};

module.exports = {
    getEvents,
    createEvent,
    deleteEvent,
    updateEvent
}