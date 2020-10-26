import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router, Route } from "react-router-dom";

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import Button from 'react-bootstrap/esm/Button';

import './main-view.scss';


// Find the root of our app
//const container = document.getElementsByClassName('app-container')[0];

// Tell React to render our app in the root DOM element
// ReactDOM.render(React.createElement(MyFlixApplication), container);

//export class MainView extends React.Component {
export default class MainView extends React.Component {
  constructor(props) {
    // Call the superclass constructor
    // so React can initialize it
    super(props);

    // Initialize the state to an empty object so we can destructure it later
    this.state = {
      movies: [],
      user: null
    };
  }

  // This overrides the render() method of the superclass
  // No need to call super() though, as it does nothing by default
  //render() {
  //  return (
  //    <div className="main-view"></div>
  //  );
  //}

  // GET ALL movies from myFlix_REST-API 
  /*componentDidMount() {
    axios.get('https://movie-api-elwen.herokuapp.com/movies')
      .then(response => {
        // Assign the result to the state
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }*/

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  getMovies(token) {
    axios.get('https://movie-api-elwen.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        this.setState({   // Assign the result to the state
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  //event listener for CTA select movie
  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  onLoggedOut(authData) {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null,
    });
    window.open('/', '_self');
  }

  render() {  //render the search result from GET all movies
    const { movies, user } = this.state;

    //if (!user)  // removed here, as would immediately render the login view if the user hadn't already logged in
    //  return <LoginView onLoggedIn={
    //    user => this.onLoggedIn(user)
    //  } />;

    // Before the movies have been loaded
    if (!movies)
      return <div className="main-view" />;

    return (
      <Router>
        <div className="main-view">

          <Route exact path="/" render={() => {
            if (!user)
              return (
                <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
              );
            return movies.map((m) => <MovieCard key={m._id} movie={m} />);
          }} />

          <Route path="/register" render={() => <RegistrationView />} />

          <Route path="/movies/:movieId" render={
            ({ match }) => <MovieView movie={
              movies.find(m => m._id === match.params.movieId)
            } />
          } />

          <Route path="/genres/:name" render={
            ({ match }) => {
              if (!movies)
                return <div className="main-view" />;
              return <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} />
            }
          } />

          <Route path="/directors/:name" render={
            ({ match }) => {
              if (!movies)
                return <div className="main-view" />;
              return <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} />
            }
          } />

          <Button className="button-secondary" onClick={() => this.onLoggedOut()}>
            LOGOUT
          </Button>
        </div >
      </Router >
    );
  }
}

/* Removed obsolete Routes after inheriting the more detailed code version within exercise 3.5
<Route exact path="/genres/:name" render={/* genre view } />
<Route exact path="/directors/:name" render={/* director view } />
*/

/* Removed this because the authors have chosen to make up their minds (again) within the the same exercise 3.5, wow!:
<Route exact path="/" render={() => movies.map(m => <MovieCard key={m._id} movie={m} />)} />
          <Route path="/movies/:movieId" render={({ match }) => <MovieView movie={movies.find(m => m._id === match.params.movieId)} />} />
*/

/* Removed this from the return function between 2nd <Route> and <Button LOGOUT>:
{selectedMovie
  ? <MovieView movie={selectedMovie} />
  : movies.map(movie => (
    <MovieCard key={movie._id} movie={movie} onClick={movie => this.onMovieClick(movie)} />
  ))
} */

//Do I have to add propTypes here? "While you’re at it, add propTypes for your other components, as well (and any other components you create in the future!)"