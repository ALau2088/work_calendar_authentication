const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./server/db/calendar.db', err => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the calendar database');
});

// CREATE & INSERT DATES
db.serialize(() => {
  db.run(
    'CREATE TABLE IF NOT EXISTS dates (id INTEGER NOT NULL PRIMARY KEY, day_number_of_month TEXT NOT NULL, month TEXT NOT NULL, year TEXT NOT NULL, week_id integer NOT NULL, day_id integer NOT NULL)',
    err => {
      if (err) {
        console.log(err.message);
      } else {
        console.log('dates table created');
      }
    }
  );

  let queryStr = `DELETE FROM dates`;
  db.run(queryStr, err => {
    if (err) {
      console.log(err.message);
    }
  });

  let weekId = 1;
  let daysCounter = 1;

  for (let dayNumberOfMonth = 29; dayNumberOfMonth <= 31; dayNumberOfMonth++) {
    let month = 'December';
    let queryStr = `INSERT INTO dates(day_number_of_month, month, year, week_id, day_id) VALUES(?,?,?,?,?)`;
    let params = [`${dayNumberOfMonth}`, month, '2019', weekId, daysCounter];

    db.run(queryStr, params, err => {
      if (err) {
        console.log(err.message);
      }
    });

    daysCounter++;
    if (daysCounter % 8 === 0) {
      weekId++;
      daysCounter = 1;
    }
  }

  let months = [
    { name: 'January', numberOfDays: 31 },
    { name: 'February', numberOfDays: 29 },
    { name: 'March', numberOfDays: 31 },
    { name: 'April', numberOfDays: 30 },
    { name: 'May', numberOfDays: 31 },
    { name: 'June', numberOfDays: 30 },
    { name: 'July', numberOfDays: 31 },
    { name: 'August', numberOfDays: 31 },
    { name: 'September', numberOfDays: 30 },
    { name: 'October', numberOfDays: 31 },
    { name: 'November', numberOfDays: 30 },
    { name: 'December', numberOfDays: 31 }
  ];
  for (let i = 0; i < months.length; i++) {
    for (
      let dayNumberOfMonth = 1;
      dayNumberOfMonth <= months[i]['numberOfDays'];
      dayNumberOfMonth++
    ) {
      let queryStr = `INSERT INTO dates(day_number_of_month, month, year, week_id, day_id) VALUES(?,?,?,?,?)`;
      let params = [
        `${dayNumberOfMonth}`,
        months[i]['name'],
        '2020',
        weekId,
        daysCounter
      ];

      db.run(queryStr, params, err => {
        if (err) {
          console.log(err.message);
        }
      });

      daysCounter++;
      if (daysCounter % 8 === 0) {
        weekId++;
        daysCounter = 1;
      }
    }
  }

  for (let dayNumberOfMonth = 1; dayNumberOfMonth <= 2; dayNumberOfMonth++) {
    let month = 'January';
    let queryStr = `INSERT INTO dates(day_number_of_month, month, year, week_id, day_id) VALUES(?,?,?,?,?)`;
    let params = [`${dayNumberOfMonth}`, month, '2021', weekId, daysCounter];

    db.run(queryStr, params, err => {
      if (err) {
        console.log(err.message);
      }
    });

    daysCounter++;
    if (daysCounter % 8 === 0) {
      weekId++;
      daysCounter = 1;
    }
  }
});

db.run(
  'CREATE TABLE IF NOT EXISTS users (id INTEGER NOT NULL PRIMARY KEY, first_name TEXT NOT NULL, last_name TEXT NOT NULL, email TEXT NOT NULL, password TEXT NOT NULL, workday_start_time TEXT NOT NULL, workday_end_time TEXT NOT NULL)',
  err => {
    if (err) {
      console.log(err.message);
    } else {
      console.log('users table created');
    }
  }
);

db.run(
  'CREATE TABLE IF NOT EXISTS events (id INTEGER NOT NULL PRIMARY KEY, title TEXT NOT NULL,  start_time TEXT NOT NULL, end_time TEXT NOT NULL, repeat TEXT NOT NULL, day_id INTEGER NOT NULL, day_number_of_month TEXT NOT NULL, user_id INTEGER NOT NULL, date_id INTEGER, week_id INTEGER,  FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE, FOREIGN KEY (date_id) REFERENCES dates (id) ON DELETE CASCADE, FOREIGN KEY (week_id) REFERENCES dates(week_id) ON DELETE CASCADE)',
  err => {
    if (err) {
      console.log(err.message);
    } else {
      console.log('events table created');
    }
  }
);

module.exports = db;
