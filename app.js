const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();

// Routes
const indexRoutes = require('./routes/index');
const authRoutes = require('./routes/auth');

// EJS setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.json());

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'ecommerce_secret',
  resave: false,
  saveUninitialized: true
}));

// Make session available in EJS
app.use((req, res, next) => {
  res.locals.user = req.session.user;
  next();
});

// Routes
app.use('/auth', authRoutes);
app.use('/', indexRoutes); // indexRoutes will handle login check

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
