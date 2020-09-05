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
  Movies.findOne({ Title: rep.params.Title })
    .then((movie) => {
//      res.json(movie);
      res.status(201).json(movies);
    })
    .catch((err) => {  // ES6-error handling
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// GET data about a genre by Title http://localhost:8080/movies/genre
//app.get('/movies/Genre/:Name', (req, res) => { //was that :Name or :Title or:Type?
app.get('/movies/Genre/:Title', (req, res) => { //was that :Name or :Title or:Type?
//  Movies.findOne({ Genre: { Name: req.params.Name }})
  Movies.findOne({ Genre: { Title: req.params.Title }})
    .then((movie) => {
      res.status(201).json(
//        'Genre: ' + movies.Director.Name,
        'Genre of this movie: ' + movie.Genre.Name,
//        'Description: ' + movie.Director.Bio // was that description or definition?
        'Description: ' + movie.Genre.Description // was that description or definition?
      );
    })
    .catch((err) => {  // ES6-error handling
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

/* obsolete version 2.5 // GET data about a genre by genreType http://localhost:8080/genreType/genre
app.get('/genreType/:genre', (req, res) => {
  res.send('Successful GET request returning data on a genre and its definition');
});*/

// GET data about a director by name
app.get('/movies/Director/:Name', (req, res) => {
  Movies.findOne({ Director: { Name: req.params.Name }})
    .then((movies) => {
      res.json(
        'Name: ' + movies.Director.Name,
        'Bio: ' + movies.Director.Bio,
        'Birth: ' + movies.Director.Birth,
      );
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
app.get('/users/:Username', (req, res) => {
  Users.findOne({ Username: req.params.Username })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {  // ES6-error handling
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// POST new user and allow to register http://localhost:8080/users
/*  OLD version from exercise 2.5
app.post('/users', (req, res) => {
  res.send('User name is missing in request body. Please add a user name.');
}); */
//Add a user
/* A JSON in this format is expected
{
  ID: Integer,
  Username: String,
  Password: String,
  Email: String,
  Birthday: Date
}*/
app.post('/users', (req, res) => {
  Users.findOne({ Username: req.body.Username }) // check if a user with the username provided by the client already exists
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.Username + 'already exists');
      } else {
        Users
          .create({   // each key in the object corresponds to a certain field specified in the schema of “models.js”
            Username: req.body.Username,
            Password: req.body.Password,
            Email: req.body.Email,
            Birthday: req.body.Birthday
          })
          .then((user) =>{res.status(201).json(user) })
        .catch((error) => {  // ES6-error handling
          console.error(error);
          res.status(500).send('Error: ' + error);
        })
      }
    })
    .catch((error) => {  // ES6-error handling
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});

// Update a user-profile, by username
/* A JSON in this format is expected
{
  Username: String,
  (required)
  Password: String,
  (required)
  Email: String,
  (required)
  Birthday: Date
}*/
app.put('/users/:Username', (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, { $set:
    {
      Username: req.body.Username,
      Password: req.body.Password,
      Email: req.body.Email,
      Birthday: req.body.Birthday
    }
  },
  { new: true }, // This returns the updated document in case it's been updated
  (err, updatedUser) => {  // mongoose error handling
    if(err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json(updatedUser);
    }
  });
});

/* obsolete version 2.5 // PUT request to update user data http://localhost:8080/users/0
app.put('/users/:user', (req, res) => {
  res.send('User data has been updeted successfully.');
}); */

/* obsolete version 2.5 // DELETE request to allow user to deregister http://localhost:8080/users/0
app.delete('/users/:user', (req, res) => {
  res.send('User has been deleted successfully.');
}); */

// Add a movie to a user's list of favorites
app.post('/users/:Username/Movies/:MovieID', (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, {
     $addToSet: { FavoriteMovies: req.params.MovieID }  // used 'addToSet' instead of '$push' to avoid duplicates in case a movie had been added already
   },
   { new: true }, // This returns the updated document in case it's been updated
  (err, updatedUser) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json(updatedUser);
    }
  });
});

// Remove a movie from a user's list of favorites
app.post('/users/:Username/Movies/:MovieID', (req, res) => {
  Users.findOneAndRemove({ Username: req.params.Username }, {
     $addToSet: { FavoriteMovies: req.params.MovieID }  // used 'addToSet' instead of '$push' to avoid duplicates in case a movie had been added already
   },
   { new: true }, // This returns the updated document in case it's been updated
  (err, updatedUser) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json(updatedUser);
    }
  });
});

/* obsolete version 2.5 // POST request to allow a user to add a movie to a favorites list http://localhost:8080/users/0/movies/3
app.post('/users/:user/movies/:title', (req, res) => {
  res.send('Movie has been added to your favorites list successfully.');
}); */

// Delete a user by username
app.delete('/users/:Username', (req, res) => {
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
