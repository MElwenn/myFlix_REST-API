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

    //Profile A: no error, no content rendered
    //Profile B: 3 react-dom errors
    //Profile C: no error, no content rendered
    //Profile D: no error, no content rendered
    //Profile E: no error, no content rendered
    //Profile F: no error, no content rendered (Shan's Advice?)
    //Profile F: no error, no content rendered (Shan's Advice?)

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

                <Nav.Link as={Link} to='/user'>
                  Profile Sh
                </Nav.Link>

                <Nav.Link as={Link} to='/registration'>
                  Sign Up
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
            <br />

            <Button className="button-secondary" onClick={() => this.onLoggedOut()}>
              LOGOUT
            </Button>
          </div >
        </Container>
      </Router >
    );
  }
}

/* OLD Navbar approaches 3.5

 <Route exact path='/user' render={       THIS is the working code to show the Profile content
  () => <ProfileView movies={movies} />
} />

The following attemots are all WRONG
                <Nav.Link as={Link} to='/user/:Username'>
                  Profile A
                </Nav.Link>
                <Nav.Link as={Link} to='/profile/:_id'>
                  Profile C
                </Nav.Link>
                <Nav.Link as={Link} to='/user/:_id'>
                  Profile D
                </Nav.Link>
                <Nav.Link as={Link} to='/profile'>
                  Profile E
                </Nav.Link>
                <Nav.Link as={Link} to={'/user/${Username._id}'}>
                  Profile F
                </Nav.Link>

                <Nav.Link as={Link} to={`/users/${this.state.user}`}>  Akunnas Suggestion
                  Profile AK
                </Nav.Link>

                <Link to={`/users/:Username`}>
                  <Button variant="link">PROFILE</Button>
                </Link>
*/


//Do I have to add propTypes here? "While you’re at it, add propTypes for your other components, as well (and any other components you create in the future!)"

// <Route exact path="/users" component={ProfileView} />

