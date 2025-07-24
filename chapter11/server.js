const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const errorHandler = require('./middleware/errorHandler');
const verifyJWT = require('./middleware/verifyJWT'); // 
const { logger } = require('./middleware/logEvents');
const cookieParser = require('cookie-parser'); //
const credentials = require('./middleware/credentials');
const PORT = process.env.PORT || 3500;
// custom middleware logger
app.use(logger);

app.use(credentials);

app.use(cors(corsOptions)); // enable CORS for all requests
//built-in middleware t habdle urlencoded data
//in other words, form data
//content-type: application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

//built-in middleware to handle json data
app.use(express.json());


// middleware to parse cookies
app.use(cookieParser());

//serve static files
app.use(express.static(path.join(__dirname, '/public')));

//routes
app.use('/', require('./routes/root'));
app.use('/register', require('./routes/register')); // register route
app.use('/auth', require('./routes/auth')); // register route
app.use('/refresh', require('./routes/refresh')); // refresh token route
app.use('/logout', require('./routes/logout')); // refresh token route
app.use(verifyJWT); // apply JWT verification middleware to all routes below this point
app.use('/employees', require('./routes/api/employees'));

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'views', '404.html'));
  }
  else if (req.accepts('json')) {
    res.json({ error: '404 Not Found' });
  }
  else {
    res.type('txt').send('404 Not Found');
  }

})
app.use(errorHandler); // error handler middleware

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));