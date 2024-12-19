const app = require("bcrypt/promises");
const {getEvents, createEvent, updateEvent, deleteEvent} = require("../controllers/eventController");
const eventRoutes = require('express').Router();

eventRoutes.get('/event/all',getEvents);
eventRoutes.post('/event/create',createEvent);
eventRoutes.put('/event/update/:id', updateEvent);
eventRoutes.delete('/event/delete/:id',deleteEvent);

module.exports = eventRoutes;