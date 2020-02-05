const models = require('../models');
const passport = require('passport');
const bcrypt = require('bcryptjs');

module.exports = {
  dates: {
    getDaysOfWeek: (req, res) => {
      let params = [req.query.weekId];
      models.dates.get(params, (err, results) => {
        if (err) {
          console.log(err.message);
        }
        res.send(results);
      });
    }
  },
  events: {
    getEvents: (req, res) => {
      let events;
      let params = [parseInt(req.query.userId), parseInt(req.query.dateId)];
      models.events.get(params, (err, results) => {
        if (err) {
          console.log(err.message);
        }
        events = results;
        let params = [
          'weekly',
          parseInt(req.query.dayId),
          parseInt(req.query.dateId)
        ];
        models.weeklyEvents.get(params, (err, results) => {
          if (err) {
            console.log(err.message);
          }
          events = [...events, ...results];
          let params = [
            'monthly',
            req.query.dayNumberOfMonth,
            parseInt(req.query.dateId)
          ];
          models.monthlyEvents.get(params, (err, results) => {
            if (err) {
              console.log(err.message);
            }
            events = [...events, ...results];
            res.send(events);
          });
        });
      });
    }
  },
  event: {
    getEvent: (req, res) => {
      let params = [req.body.eventId];
      models.event.get(params, (err, result) => {
        if (err) {
          console.log(err.message);
        } else {
          res.send(result);
        }
      });
    },
    addEvent: (req, res) => {
      let params = [
        req.body.title,
        req.body.startTime,
        req.body.endTime,
        req.body.repeat,
        req.body.dayId,
        req.body.dayNumberOfMonth,
        req.body.userId,
        req.body.dateId,
        req.body.weekId
      ];
      models.event.post(params, (err, result) => {
        if (err) {
          console.log(err.message);
        } else {
          console.log('event added');
          res.end();
        }
      });
    },
    editEvent: (req, res) => {
      let params = [
        req.body.title,
        req.body.startTime,
        req.body.endTime,
        req.body.repeat,
        req.body.dayId,
        req.body.dayNumberOfMonth,
        req.body.userId,
        req.body.dateId,
        req.body.weekId,
        req.body.id
      ];
      models.event.put(params, (err, result) => {
        if (err) {
          console.log(err.message);
        } else {
          console.log('event edited');
          res.end(result);
        }
      });
    },
    deleteEvent: (req, res) => {
      let params = [req.query.eventId];
      models.event.delete(params, err => {
        if (err) {
          console.log(err.message);
        } else {
          console.log('event deleted');
          res.end();
        }
      });
    }
  },
  users: {
    getAllUsers: (req, res) => {
      models.users.get((err, results) => {
        if (err) {
          console.log(err.messages);
        } else {
          res.send(results);
        }
      });
    }
  },
  user: {
    getUser: (req, res, next) => {
      // let params = [req.query.email];
      // models.user.get(params, (err, result) => {
      //   if (err) {
      //     console.log(err.message);
      //   } else {
      //     res.send(result);
      //   }
      // });
      passport.authenticate(
        'local',
        {
          successRedirect: '/',
          failureRedirect: '/login',
          failureFlash: true
        },
        (err, user, info) => {
          if (err) {
            return next(err);
          }
          if (!user) {
            console.log('no user');
            return;
          }
          // req.logIn(user, err => {
          //   if (err) {
          //     return next(err);
          //   }
          //   console.log(user);
          //   return;
          // });
          console.log('line 161', req);
          res.send(user);
        }
      )(req, res, next);
    },
    addUser: (req, res) => {
      // check if user exists
      models.user.get([req.body.email], (err, result) => {
        if (err) {
          console.log(err.message);
        } else {
          let params = [
            req.body.firstName,
            req.body.lastName,
            req.body.email,
            req.body.password,
            req.body.workDayStartTime,
            req.body.workDayEndTime
          ];

          // hash and salt password
          bcrypt.genSalt(10, (err, salt) => {
            let password = params[3];
            bcrypt.hash(password, salt, (err, hash) => {
              if (err) throw err;
              password = hash;
              params[3] = password;
              models.user.post(params, (err, result) => {
                if (err) {
                  console.log(err.message);
                } else {
                  console.log('user added');
                  res.send(result);
                }
              });
            });
          });
        }
      });
    }
  }
};
