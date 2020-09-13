// integrate mongoose to allow REST API to perform CRUD operation on your MongoDB data
const mongoose = require('mongoose');
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;

// allows mongoose to connect to the database named "test"
mongoose.connect('mongodb://localhost:27017/test', {
  useNewUrlParser: true, useUnifiedTopology: true
});

const express = require('express'); // Import express package
const app = express(); // variable that encapsulates Express’s functionality to configure the web server
const bodyParser = require('body-parser'); // require the body-parser module
const methodOverride = require('method-override');
const morgan = require('morgan'); // logging middleware
const uuid = require('uuid'); // generates a Universally Unique Identifier

// set time stamp
let requestTime = (req, res, next) => {
  req.requestTime = Date.now();
  next();
};

// middleware components
app.use(express.static('public')); // invoke files from the public folder
app.use(morgan('common'));         // logging
app.use(requestTime);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());

// Requests against REST API
app.get('/secreturl', (req, res, next) => {
  res.send('This is a secret url with super top-secret content.');
});

// GET public documentation
app.get('/documentation', (req, res) => {
  res.sendFile('public/documentation.html', { root: __dirname });
});

// Get ALL movies
app.get('/movies', (req, res) => {
  Movies.find()
    .then((movies) => {
      res.status(201).json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

/* obsolete version 2.5 // GET the list of data about ALL movies http://localhost:8080/movies
app.get('/movies', (req, res) => {
  res.send('Successful GET request returning data on all movies');
});*/

// GET data about a single movie by title to the user http://localhost:8080/movies/snatch
app.get('/movies/:Title', (req, res) => {
  Movies.findOne({ Title: req.params.Title })
    .then((movie) => {
      res.status(201).json(movie);
//      res.status(201).json(movies);
    })
    .catch((err) => {  // ES6-error handling
      console.error(err);
      res.status(500).send('Error: Could not GET data about a single movie by title' + err);
    });
});

// GET data about a genre and description by Title http://localhost:8080/movies/Genre/:Title
//app.get('/movies/Genre/:Name', (req, res) => { //was that :Name or :Title or:Type?
app.get('/movies/Genre/:Title', (req, res) => { //was that :Name or :Title or:Type?
//  Movies.findOne({ Genre: { Name: req.params.Name }})
//  Movies.findOne({ Genre: { Title: req.params.Title }})
  Movies.findOne({ 'Genre.Name': req.params.Title })
    .then((movie) => {
      res.status(201).json(movie.Genre);
    })
    .catch((err) => {  // ES6-error handling
      console.error(err);
      res.status(500).send('Error: Could not GET data about a genre and description by Title' + err);
    });
});

/* obsolete version 2.5 // GET data about a genre by genreType http://localhost:8080/genreType/genre
app.get('/genreType/:genre', (req, res) => {
  res.send('Successful GET request returning data on a genre and its definition');
});*/

// GET data about a director by name
app.get('/movies/Director/:Name', (req, res) => {
  Movies.findOne({ 'Director.Name': req.params.Name })
    .then((movie) => {
      res.status(201).json(movie.Director);
//      res.json(
//        'Name: ' + movies.Director.Name,
//        'Bio: ' + movies.Director.Bio,
//        'Birth: ' + movies.Director.Birth,
//      );
    })
    .catch((err) => {  // ES6-error handling
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

/* obsolete version 2.5 // GET data about a director by name http://localhost:8080/directors/director
app.get('/directors/:director', (req, res) => {
  res.send('Successful GET request returning data on a director by name');
}); */


// Get ALL users
app.get('/users', (req, res) => {
  Users.find()
    .then((users) => {
      res.status(201).json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// Get ONE specific user by username
app.get('/users/:User', (req, res) => {
  Users.findOne({ User: req.params.User })
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((err) => {  // ES6-error handling
      console.error(err);
      res.status(500).send('Error: Could not GET this user by name.' + err);
    });
});

// Update a user-profile, by username
app.put('/users/:User', (req, res) => {
  Users.findOneAndUpdate({ User: req.params.User },
  {
    $set: {
      User: req.body.User,
      Email: req.body.Email,
      Password: req.body.Password,
      Birthdate: req.body.Birthdate,
      FavoriteMovies: []
    }
  },
  { new: true }, // This returns the updated document in case it's been updated
  (err, updatedUser) => {  // mongoose error handling
    if (err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    }
    else {
      res.status(201).json(updatedUser);
    }
  });
});

// POST new user and allow to register http://localhost:8080/users
//app.post('/users/:User', (req, res) => {
/* app.post('/users', (req, res) => {
  Users.findOne({ User: req.body.User }) // check if a user with the username provided by the client already exists
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.User + ' already exists');
      }
      else {
        Users.create({   // each key in the object corresponds to a certain field specified in the schema of “models.js”
          User: req.body.User,
          Email: req.body.Email,
          Password: req.body.Password,
          Birthdate: req.body.Birthdate,
          FavoriteMovies: []
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
}); */
//POST new user (allow to register) using Username
app.post('/users', (req, res) => {
  Users.findOne({ Usernam: req.body.Username }) // check if a user with the username provided by the client already exists
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.Username + ' already exists');
      }
      else {
        Users.create({   // each key in the object corresponds to a certain field specified in the schema of “models.js”
          Username: req.body.Username,
          Email: req.body.Email,
          Password: req.body.Password,
          Birthdate: req.body.Birthdate,
          FavoriteMovies: []
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
});

// Add a movie to a user's list of favorites
//app.post('/users/:Username/Movies/:MovieID', (req, res) => {
app.post('/users/:User/movies/:_id', (req, res) => {
//  Users.findOneAndUpdate({ Username: req.params.Username }, {
  Users.findOneAndUpdate({ User: req.params.User }, {
//     $addToSet: { FavoriteMovies: req.params.MovieID }  // used 'addToSet' instead of '$push' to avoid duplicates in case a movie had been added already
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
//app.delete('/users/:Username/Movies/:MovieID', (req, res) => {
app.delete('/users/:User/movies/:_id', (req, res) => {
  Users.findOneAndUpdate(
    { User: req.params.User },
    { $pull: { FavoriteMovies: req.params._id } },
    { new: true }, // This returns the updated document in case it's been updated
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error: Movie could not be removed from your favorites list. ' + err);
      }
      else {
        res.status(201).jason(updatedUser);
      }
    }
  );
});

/* obsolete version 2.5 // POST request to allow a user to add a movie to a favorites list http://localhost:8080/users/0/movies/3
app.post('/users/:user/movies/:title', (req, res) => {
  res.send('Movie has been added to your favorites list successfully.');
}); */
// Delete a user by username
app.delete('/users/:Username', (req, res) => {
  Users.findOneAndRemove({ User: req.params.Username })
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
});

/* obsolete version 2.5 // DELETE request to allow a user to remove a movie from the favorites list http://localhost:8080/users/0/movies/3
app.delete('/users/:user/movies/:title', (req, res) => {
  res.send('Movie has been deleted from your favorites list successfully.');
}); */

// ...Task 2.5 ends here

// error handling middleware function using express
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server ERROR occured!');
});

// listen for requests
app.listen(8080, () =>
  console.log('My app is listening on port 8080.'));
//);
