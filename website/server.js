const express = require('express');
const path = require('path');
const hbs = require('hbs');

const travelRouter = require('./app_server/routes/travel');

const app = express();

// View engine setup (HBS)
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, 'app_server', 'views', 'partials'));

// Static assets
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/travel', travelRouter);

// Home route (simple)
app.get('/', (req, res) => {
  res.redirect('/travel');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
