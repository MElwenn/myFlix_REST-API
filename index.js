// import path module to enable working with the file system
const path = require("path");

// Cross Origin Resource Sharing (CORS) ensure that all domains are allowed to make requests to the API
const cors = require('cors');

require('dotenv').config()

// integrate mongoose to allow REST API to perform CRUD operation on your MongoDB data
const mongoose = require('mongoose');

// allows mongoose to connect to the database named "test"
mongoose.connect(process.env.CONNECTION_URI, {
  useNewUrlParser: true, useUnifiedTopology: true
});

const express = require('express'); // Import express package
const app = express(); // variable that encapsulates Express’s functionality to configure the web server
const bodyParser = require('body-parser'); // require the body-parser module
const methodOverride = require('method-override');
const morgan = require('morgan'); // logging middleware
const uuid = require('uuid'); // generates a Universally Unique Identifier

// integrate authentication
const passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  Models = require('./models.js'),
  passportJWT = require('passport-jwt');
const Movies = Models.Movie;
const Users = Models.User,
  JWTStrategy = passportJWT.Strategy,
  ExtractJWT = passportJWT.ExtractJwt;

// set time stamp
let requestTime = (req, res, next) => {
  req.requestTime = Date.now();
  next();
};

// Experess validator for user-input validation (security)
const { check, validationResult } = require('express-validator');

// middleware components
app.use(express.static('public')); // invoke files from the public folder

//webpage to be shown at https://movie-api-elwen.herokuapp.com/
app.use("/client", express.static(path.join(__dirname, "client", "dist")));
app.get("/client/*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.use(morgan('common'));         // logging
app.use(requestTime);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(cors());

// Import auth.js file
let auth = require('./auth')(app);

// Requests against REST API
app.get('/secreturl', (req, res, next) => {
  res.send('This is a secret url with super top-secret content.');
});

// use cors function
let allowedOrigins = ['http://localhost:1234', 'http://localhost:8080', 'http://testsite.com'];

app.use(cors({ // creates a list of allowed domains within the variable allowedOrigins
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) { // If a specific origin isn’t found on the list of allowed origins
      let message = 'The CORS policy for this application doesn’t allow access from origin ' + origin;
      return callback(new Error(message), false);
    }
    return callback(null, true);
  }
}));

//GET public documentation (this is the webpage currently at https://movie-api-elwen.herokuapp.com/)
//app.get('/', (req, res) => {
//  res.sendFile('public/documentation.html', { root: __dirname });
//});

// Get ALL movies
app.get(
  '/movies',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Movies.find()
      .then((movies) => {
        res.status(201).json(movies);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
  });

// GET data about a single movie by title to the user http://localhost:8080/movies/snatch
app.get(
  '/movies/:Title',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Movies.findOne({ Title: req.params.Title })
      .then((movies) => {
        res.status(201).json(movies);
      })
      .catch((err) => {  // ES6-error handling
        console.error(err);
        res.status(500).send('Error: Could not GET data about a single movie by title' + err);
      });
  }
);

// GET data about a genre and description by Title
app.get(
  '/movies/Genre/:Title',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Movies.findOne({ 'Genre.Name': req.params.Title })
      .then((movie) => {
        res.status(201).json(movie.Genre);
      })
      .catch((err) => {  // ES6-error handling
        console.error(err);
        res.status(500).send('Error: Could not GET data about a genre and description by Title' + err);
      });
  });

// GET data about a director by name
app.get('/movies/Director/:Name', passport.authenticate('jwt', { session: false }), (req, res) => {
  Movies.findOne({ 'Director.Name': req.params.Name })
    .then((movie) => {
      res.status(201).json(movie.Director);
    })
    .catch((err) => {  // ES6-error handling
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// Get ONE specific user by username
app.get(
  '/users/:Username',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Users.findOne({ Username: req.params.Username })
      .then((user) => {
        res.status(201).json(user);
      })
      .catch((err) => {  // ES6-error handling
        console.error(err);
        res.status(500).send('Error: Could not GET this user by name.' + err);
      });
  }
);

// Get ALL users
app.get('/users', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.find()
    .then((users) => {
      res.status(201).json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// Update a user-profile, by username
app.put(
  '/users/:Username',
  // validation logic "express-vaidator"
  [
    check('Username', 'Username is required').isLength({ min: 3 }),
    check('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
    check('Password', 'Password is required').not().isEmpty(),
    check('Email', 'Email does not appear to be valid').isEmail()
  ],
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    let errors = validationResult(req); // check the validation object for errors
    if (!errors.isEmpty()) {
      console.log(errors)
      return res.status(422).json({ errors: errors.array() });
    }
    let hashedPassword = Users.hashPassword(req.body.Password); // Hash any password entered by the user when registering before storing it in the MongoDB database

    Users.findOneAndUpdate({ Username: req.params.Username },
      {
        $set: {
          Username: req.body.Username,
          Password: hashedPassword,
          Email: req.body.Email,
          Birthdate: req.body.Birthdate,
          FavoriteMovies: req.body.FavoriteMovies || []
        },
      },
      { new: true }, // This returns the updated document in case it's been updated
      (err, updatedUser) => {  // mongoose error handling
        if (err) {
          console.error(err);
          res.status(500).send('Error: User could not be updated' + err);
        }
        else {
          res.status(201).json(updatedUser);
        }
      })
  }
);

//POST new user (allow to register) using Username
app.post(
  '/users',
  // validation logic "express-vaidator"
  [
    check('Username', 'Username is required').isLength({ min: 3 }),
    check('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
    check('Password', 'Password is required').not().isEmpty(),
    check('Email', 'Email does not appear to be valid').isEmail()
  ],
  (req, res) => {
    let errors = validationResult(req); // check the validation object for errors
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    console.log(Users);
    let hashedPassword = Users.hashPassword(req.body.Password); // Hash any password entered by the user when registering before storing it in the MongoDB database
    Users.findOne({ Username: req.body.Username }) // check if a user with the username provided by the client already exists
      .then((user) => {
        if (user) {
          return res.status(400).send(req.body.Username + ' already exists');
        }
        else {
          Users.create({   // each key in the object corresponds to a certain field specified in the schema of “models.js”
            Username: req.body.Username,
            // Password: req.body.Password,
            Password: hashedPassword,
            Email: req.body.Email,
            Birthdate: req.body.Birthdate,
            FavoriteMovies: req.body.FavoriteMovies || []
          })
            .then((user) => {
              res.status(201).json(user);
            })
            .catch((error) => {  // ES6-error handling
              console.error(error);
              res.status(500).send('Error: New user could not be created. ' + error);
            });
        }
      })
      .catch((error) => {  // ES6-error handling
        console.error(error);
        res.status(500).send('Error: Registration of new user failed. ' + error);
      });
  }
);

// Add a movie to a user's list of favorites
app.post('/users/:Username/movies/:_id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, {
    $addToSet: { FavoriteMovies: req.params._id }  // used 'addToSet' instead of '$push' to avoid duplicates in case a movie had been added already
  },
    { new: true }, // This returns the updated document in case it's been updated
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error: Movie could not be added to your favorites list. ' + err);
      } else {
        res.status(201).json(updatedUser);
      }
    });
});

// Remove a movie from a user's list of favorites
app.delete(
  '/users/:Username/movies/:_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Users.findOneAndUpdate(
      { Username: req.params.Username },
      { $pull: { FavoriteMovies: req.params._id } },
      { new: true }, // This returns the updated document in case it's been updated
      (err, updatedUser) => {
        if (err) {
          console.error(err);
          res.status(500).send('Error: Movie could not be removed from your favorites list. ' + err);
        }
        else {
          res.status(201).json(updatedUser);
        }
      }
    );
  }
);

// Delete a user by username
app.delete(
  '/users/:Username',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Users.findOneAndRemove({ Username: req.params.Username })
      .then((user) => {
        if (!user) {
          res.status(400).send(req.params.Username + ' was not found.');
        } else {
          res.status(200).send(req.params.Username + ' was deleted sucessfully.');
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
  }
);

// error handling middleware function using express
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server ERROR occured!');
});

// listen for requests
const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0', () => {
  console.log('Listening on Port ' + port);
});
