import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';


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
      movies: null,
      selectedMovie: null,
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
  componentDidMount() {
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

  render() {  //render the search result from GET all movies
    const { movies, selectedMovie } = this.state;

    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

    // Before the movies have been loaded
    if (!movies) return <div className="main-view" />;

    return (
      <div className="main-view">
        MainView
        {selectedMovie
          ? <MovieView movie={selectedMovie} />
          : movies.map(movie => (
            <MovieCard key={movie._id} movie={movie} onClick={movie => this.onMovieClick(movie)} />
          ))
        }
      </div>
    );
  }
}

//Do I have to add propTypes here? "While you’re at it, add propTypes for your other components, as well (and any other components you create in the future!)"