const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');
const { logger } = require('./middleware/logEvents');
const PORT = process.env.PORT || 3500;
// custom middleware logger
app.use(logger);
//Cross origin Resurce Sharing
const whitelist = ['https://www.yoursite.com', 'http://127.0.0.1.5500', 'http://localhost:3500'];

const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) { // allow requests with no origin like mobile apps or curl requests
      callback(null, true);
    }
    else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions)); // enable CORS for all requests

//built-in middleware t habdle urlencoded data
//in other words, form data
//content-type: application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

//built-in middleware to handle json data
app.use(express.json());

//serve static files
app.use(express.static(path.join(__dirname, '/public')));
app.use("/subdir", express.static(path.join(__dirname, '/public')));

//routes
app.use('/', require('./routes/root'));
app.use('/subdir', require('./routes/subdir'));
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