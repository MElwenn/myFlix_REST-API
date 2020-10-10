const jwtSecret = 'your_jwt_secret'; // This has to be the same key used in the JWTStrategy
const jwt = require('jsonwebtoken');
const passport = require('passport');

require('./passport'); // local passport file

let generateJWTToken = (user) => {
  return jwt.sign(user, jwtSecret, {
    subject: user.Username, // This is the username encoded in the JWT
    expiresIn: '7d', // This specifies that the token will expire in 7 days
    algorithm: 'HS256' // This is the algorithm used to “sign” or encode the values of the JWT
  });
}

// POST login
module.exports = (router) => {
  router.post('/login', (req, res) => {
    passport.authenticate('local', { session: false }, (error, user, info) => { //authenticating users with basic HTTP authentication
      if (error || !user) {
        return res.status(400).json({
          message: 'Login failed',
          user: user
        });
      }
      req.login(user, { session: false }, (error) => {
        if (error) {
          return res.send(error);
        }
        console.log(user)
        let token = generateJWTToken(user.toJSON()); // generate a JWT token for authenticating
        console.log(token)
        return res.json({ user, token }); //ES6 shorthand for res.json({ user: user, token: token })
      });
    })(req, res);
  });
}
