const mongoose = require('mongoose');
let movieSchema = mongoose.Schema({  // define movie schema
  Title: { type: String, required: true },
  Description: { type: String, required: true },
  Genre: {
    Name: String,
    Description: String
  },
  Director: {
    Name: String,
    Bio: String,
    Birth: String
  },
  Actors: [String],
  ImagePath: String,
  Featured: Boolean
});

let userSchema = mongoose.Schema({  // define user schema
  Username: { type: String, required: true },
  Password: { type: String, required: true },
  Email: { type: String, required: true },
  Birthday: Date,
  FavoriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }]
});

// create mongoose models ('Movie' & 'User' will create collections called “db.movies” & “db.users” on the db-side)
let Movie = mongoose.model('Movie', movieSchema);
let User = mongoose.model('User', userSchema);

// exprot models to index.js
module.exports.Movie = Movie;
module.exports.User = User;

// module to hash users’ passwords and compare hashed passwords every time users log in
const bcrypt = require('bcrypt');

userSchema.statics.hashPassword = (password) => {
  return bcrypt.hashSync(password, 10);
};

userSchema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.Password);
};
