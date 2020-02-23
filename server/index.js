const path = require('path');
const express = require('express');
const app = express();
const port = 3000;
const db = require('./db');
const bodyParser = require('body-parser');
const router = require('./routes.js');

const session = require('express-session');

const passport = require('passport');
require('./config/passport')(passport);

app.use(bodyParser.json()); // for axios

app.use(bodyParser.urlencoded({ extended: false }));

// express-session middleware
app.use(session({ secret: 'ninja' }));

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use('/api', router);

app.use(express.static('public'));

// app.get('/', (req, res) => res.send('Hello World!'));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'), err => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
