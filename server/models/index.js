const db = require('../db');

module.exports = {
  dates: {
    get: (params, callback) => {
      let queryStr = `SELECT * FROM dates WHERE week_id = ?`;
      db.all(queryStr, params, (err, rows) => callback(err, rows));
    }
  },
  events: {
    get: (params, callback) => {
      let queryStr = `SELECT * FROM events WHERE user_id = ? AND date_id = ?`;
      db.all(queryStr, params, (err, rows) => callback(err, rows));
    }
  },
  weeklyEvents: {
    get: (params, callback) => {
      let queryStr = `SELECT * FROM events WHERE repeat = ? AND day_id = ? AND date_id IS NOT ?`;
      db.all(queryStr, params, (err, rows) => callback(err, rows));
    }
  },
  monthlyEvents: {
    get: (params, callback) => {
      let queryStr = `SELECT * FROM events WHERE repeat = ? AND day_number_of_month = ? AND date_id IS NOT ?`;
      db.all(queryStr, params, (err, rows) => callback(err, rows));
    }
  },
  event: {
    get: (params, callback) => {
      let queryStr = `SELECT * FROM events WHERE id = ?`;
      db.get(queryStr, params, (err, result) => callback(err, result));
    },
    post: (params, callback) => {
      let queryStr = `INSERT INTO events (title, start_time, end_time, repeat, day_id, day_number_of_month, user_id, date_id, week_id) VALUES(?,?,?,?,?,?,?,?,?)`;
      db.run(queryStr, params, err => {
        let queryStr =
          'SELECT id FROM events WHERE start_time = ? AND end_time = ? AND user_id=? AND date_id = ?';
        let startTime = params[1];
        let endTime = params[2];
        let userId = params[4];
        let dateId = params[5];
        db.get(
          queryStr,
          [startTime, endTime, userId, dateId],
          (err, result) => {
            callback(err, result);
          }
        );
      });
    },
    put: (params, callback) => {
      let queryStr = `UPDATE events SET title = ?, start_time = ?, end_time = ?, repeat =? , day_id=?, day_number_of_month=?, user_id =? , date_id=?, week_id=? WHERE id = ?`;
      db.run(queryStr, params, err => {
        let queryStr =
          'SELECT id FROM events WHERE start_time = ? AND end_time = ? AND user_id=? AND date_id = ?';
        let startTime = params[1];
        let endTime = params[2];
        let userId = params[4];
        let dateId = params[5];
        db.get(
          queryStr,
          [startTime, endTime, userId, dateId],
          (err, result) => {
            callback(err, result);
          }
        );
      });
    },
    delete: (params, callback) => {
      let queryStr = `DELETE FROM events WHERE id = ?`;
      db.run(queryStr, params, err => {
        callback(err);
      });
    }
  },
  users: {
    get: callback => {
      let queryStr = `SELECT email FROM users`;
      db.all(queryStr, [], (err, rows) => {
        callback(err, rows);
      });
    }
  },
  user: {
    get: (params, callback) => {
      let queryStr = `SELECT * FROM users WHERE email = ?`;
      db.get(queryStr, params, (err, result) => callback(err, result));
    },
    post: (params, callback) => {
      let queryStr = `INSERT INTO users (first_name, last_name, email, password, workday_start_time, workday_end_time) VALUES(?,?,?,?,?,?)`;
      db.run(queryStr, params, err => {
        if (err) {
          throw err;
        } else {
          let queryStr =
            'SELECT id, email, password FROM users WHERE email = ?';
          let email = params[2];
          db.get(queryStr, email, (err, result) => {
            callback(err, result);
          });
        }
      });
    }
  }
};
