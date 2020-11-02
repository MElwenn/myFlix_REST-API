import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router, Link, Route } from "react-router-dom";

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';

import Container from 'react-bootstrap/Container';
import { Navbar, Nav } from 'react-bootstrap';
import Button from 'react-bootstrap/esm/Button';

import './main-view.scss';

//export class MainView extends React.Component {
export default class MainView extends React.Component {
  constructor(props) {
    super(props);  // Call the superclass constructor so React can initialize it
    this.state = {   // Initialize the state to an empty object so we can destructure it later
      movies: [],
      user: null
    };
  }

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

    // Before the movies have been loaded
    if (!movies)
      return <div className="main-view" />;

    return (
      <Router>
        <Container>
          <div className="main-view">
            <Navbar className="fixed-top" bg="dark" variant="dark">
              <Navbar.Brand href="#home">Navbar</Navbar.Brand>
              <Nav className="mr-auto">
                <Nav.Link as={Link} to='/'>
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to='/users/:Username'>
                  Profile
                </Nav.Link>
              </Nav>
            </Navbar>
            <br />

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

            <Route path="/movies/genres/:name" render={
              ({ match }) => {
                if (!movies)
                  return <div className="main-view" />;
                return <GenreView genre={movies.find((m) => m.Genre.Name === match.params.name).Genre} />
              }
            } />

            <Route path="/movies/directors/:name" render={
              ({ match }) => {
                if (!movies)
                  return <div className="main-view" />;
                return <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} />
              }
            } />

            <Route exact path='/user'
              render={
                () => <ProfileView movies={movies} />
              }
            />
            <Link to={`/users/:Username`}>
              <Button variant="link">PROFILE</Button>
            </Link>

            <Button className="button-secondary" onClick={() => this.onLoggedOut()}>
              LOGOUT
          </Button>
          </div >
        </Container>
      </Router >
    );
  }
}


//Do I have to add propTypes here? "While you’re at it, add propTypes for your other components, as well (and any other components you create in the future!)"

// <Route exact path="/users" component={ProfileView} />

