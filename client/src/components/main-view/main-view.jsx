import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';


// Find the root of our app
//const container = document.getElementsByClassName('app-container')[0];

// Tell React to render our app in the root DOM element
// ReactDOM.render(React.createElement(MyFlixApplication), container);

export default class MainView extends React.Component {
  constructor(props) {
    // Call the superclass constructor
    // so React can initialize it
    super(props);

    // Initialize the state to an empty object so we can destructure it later
    this.state = {
      movies: null,
      selectedMovie: null
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

  //event listener for CTA select movie
  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  render() {  //render the search result from GET all movies
    // If the state isn't initialized, this will throw on runtime
    // before the data is initially loaded
    const { movies, selectedMovie } = this.state;

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