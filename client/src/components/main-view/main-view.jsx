import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import { MainView } from './components/main-view/main-view';

// Import statement to indicate that we need to bundle `./index.scss`
import './index.scss';

// Main component (will eventually use all the others)
class MyFlixApplication extends React.Component {
  render() {
    return <MainView />; //isn't this a duplicate to line 30?
  }
}

// Find the root of our app
const container = document.getElementsByClassName('app-container')[0];

// Tell React to render our app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);

export class MainView extends React.Component {
  constructor() {
    // Call the superclass constructor
    // so React can initialize it
    super();

    // Initialize the state to an empty object so we can destructure it later
    this.state = {};
  }

  // This overrides the render() method of the superclass
  // No need to call super() though, as it does nothing by default
  render() {
    return (
      <div className="main-view"></div>
    );
  }

  // GET ALL movies from myFlix_REST-API 
  componentDidMount() {
    //axios.get('<https://movie-api-elwen.herokuapp.com/movies>')
    axios.get('<mongodb+srv://martin_elwenn:TestMartin1234@cluster0.qcgy1.mongodb.net/MovieApi?retryWrites=true&w=majority>')
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

  render() {  //render the search result from GET all movies
    // If the state isn't initialized, this will throw on runtime
    // before the data is initially loaded
    const { movies } = this.state;

    // Before the movies have been loaded
    if (!movies) return <div className="main-view" />;

    return (
      <div className="main-view">
        { movies.map(movie => (
          <div className="movie-card" key={movie._id}>{movie.Title}</div>
        ))}
      </div>
    );
  }
}