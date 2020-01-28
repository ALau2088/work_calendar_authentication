const router = require('express').Router();
const controller = require('./controllers');

router.get('/dates', controller.dates.getDaysOfWeek);

router.get('/events', controller.events.getEvents);

router.get('/event', controller.event.getEvent);

router.post('/event', controller.event.addEvent);

router.put('/event', controller.event.editEvent);

router.delete('/event', controller.event.deleteEvent);

// router.get('/users', controller.users.getAllUsers);

// router.get('/user', controller.user.getUser);

// router.post('/user', controller.user.addUser);

router.post('/login', controller.user.getUser);

router.post('/register', controller.user.addUser);

module.exports = router;
