/* asv */

const { response } = require("express");
const Event = require("../models/Event");

/* ----------Get Event---------- */
const getEvents = async(req, res = response) => {

    const events = await Event.find()
        .populate('user', 'name');

    res.json({
        events
    });
};

/* ----------Create Event---------- */
const createEvent = async(req, res = response) => {

    const event = new Event( req.body );

    try {

        event.user = req.uid;

        await event.save();

        res.json({
            msg: "Event Saved",
            event
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Talk with the manager"
        });
    }

   
};

/* ----------Update Event---------- */
const updateEvent = async( req, res = response) => {

    const eventId = req.params.id;
    const uid = req.uid

    try {

        const event = await Event.findById( eventId );

        if ( !event ) {
            return res.status(400).json({
                msg: "Event doesnt exist"
            }) 
        };

        // check person want udpate were who created
        if ( event.user.toString() !== uid ) {
            return res.status(401).json({
                msg: "You can't modify event"
            })
        };

        //modify event

        const bodyEvent = {
            ...req.body,
            user: uid
        };

        const updatedEvent = await Event.findByIdAndUpdate( eventId, bodyEvent, { new: true } );

        res.json({
            updatedEvent
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Talk with the manager"
        })
    };
}

/* ----------Delete Event---------- */
const deleteEvent = async(req, res = response) => {

    const eventId = req.params.id;
    const uid = req.uid

    try {

        const event = await Event.findById( eventId );

        if ( !event ) {
            return res.status(400).json({
                msg: "Event doesnt exist"
            }) 
        };

        // check person want delete were who created
        if ( event.user.toString() !== uid ) {
            return res.status(401).json({
                msg: "You can't delete event"
            })
        };

        //delete event
        const deletedEvent = await Event.findByIdAndDelete( eventId );

        res.json({
            deletedEvent
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Talk with the manager"
        })
    };

};

module.exports = {
    getEvents,
    createEvent,
    deleteEvent,
    updateEvent
}