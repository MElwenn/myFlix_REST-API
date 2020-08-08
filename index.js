const express = require('express'); // Import express package
const app = express(); // variable that encapsulates Express’s functionality to configure the web server
const morgan = require('morgan'); // logging middleware
const uuid = require('uuid'); // generates a Universally Unique Identifier
// Obsolete as logging is done by Morgan middleware
//let myLogger = (req, res, next) => {
//  console.log(req.url);
//  next();
//};

// set time stamp
let requestTime = (req, res, next) => {
  req.requestTime = Date.now();
  next();
};

// middleware components
app.use(express.static('public')); // invoke files from the public folder
app.use(morgan('common'));         // logging
//app.use(myLogger);               // presumably replaced by morgan
app.use(requestTime);

// GET requests
app.get('/', (req, res) => {
//  res.send('Welcome to my movie app!');
//});
//app.get('/', function (req, res) => {
  let responseText = 'Welcome to my movie app!';
  responseText += '<small>Requested at: ' + req.requestTime + '</small>';
  res.send(responseText);
});

app.get('/secreturl', (req, res, next) => {
  res.send('This is a secret url with super top-secret content.');
});

app.get('/movies', (req, res, next) => {
  res.json(topMovies);
});

//app.use(express.static('public'));
app.get('/documentation', (req, res) => {
  res.sendFile('public/documentation.html', { root: __dirname });
});

const bodyParser = require('body-parser'),
  methodOverride = require('method-override');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());
app.use(methodOverride());

// error handling middleware function using express
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server ERROR occured!');
});

// JSON object containing data about your top 10 movies
let topMovies = [
  {
    title: 'Snatch',
    director: 'Guy Ritchie',
    year: '2000'
  },
  {
    title: 'Pulp Fiction',
    director: 'Quentin Tarantino',
    year: '1994'
  },
  {
    title: 'Fargo',
    director: 'Ethan Coen, Joel Coen',
    year: '1996'
  },
  {
    title: 'The Cabin in the Woods',
    director: 'Drew Goddard',
    year: '2011'
  },
  {
    title: '28 days later',
    director: 'Danny Boyle',
    year: '2002'
  },
  {
    title: 'Night on Earth',
    director: 'Jim Jarmush',
    year: '1991'
  },
  {
    title: 'Dogville',
    director: 'Lars von Trier',
    year: '2003'
  },
  {
    title: 'Departed',
    director: 'Martin Scorsese',
    year: '2006'
  },
  {
    title: 'The Empire strikes back',
    director: 'George Lucas',
    year: '2003'
  },
  {
    title: 'Dune',
    director: 'David Lynch',
    year: '1984'
  }
];

// listen for requests
app.listen(8080, () =>
  console.log('My app is listening on port 8080.'));
//);
