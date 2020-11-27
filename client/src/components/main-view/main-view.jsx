import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
//import PropTypes from 'prop-types';
//import ReactDOM from 'react-dom';

import { BrowserRouter as Router, Link, Route } from "react-router-dom";

import { setMovies } from '../../actions/actions';  //import actions for Redux

import MoviesList from '../movies-list/movies-list';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
//import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';
//import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
//import { MovieFilter } from '../movie-filter/movie-filter';
//import movieFilterDropdown from '../movie-filter/movie-filter';

import Container from 'react-bootstrap/Container';
import { Navbar, Nav, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/esm/Button';

import './main-view.scss';

// automatically add “/client” to all client-side requests
const basename = location.host === "localhost:1234" ? "/" : "/client";

class MainView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
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
        this.props.setMovies(response.data); // #1 the movies live in the store
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
    this.setState({
      user: authData.user.Username,
      favoriteMovies: authData.user.FavoriteMovies
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    localStorage.setItem('favoriteMovies', authData.user.FavoriteMovies);
    this.getMovies(authData.token);
  }

  onLoggedOut(authData) {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null,
    });
    window.open('/client', '_self'); // replaced "/"
  }

  //render the search result from 'GET all movies'
  render() {

    // connect actions to the MainView (wrapping inputs and outputs to a component)
    let { movies } = this.props;
    let { user } = this.state;

    // Before the movies have been loaded
    if (!movies)
      return <div className="main-view" />;

    return (
      <Router basename={baseName}>
        <Container>
          <div className="main-view">
            <Navbar className="fixed-top" bg="dark" variant="dark">
              <Navbar.Brand href="#home">Navbar</Navbar.Brand>
              <Nav className="mr-auto">

                <Nav.Link as={Link} to='/client'>
                  Home
                </Nav.Link>

                <Nav.Link as={Link} to={`/user/${user}`}>
                  Profile
                </Nav.Link>

                <Nav.Link as={Link} to='/register'>
                  Sign Up
                </Nav.Link>

                <Button className="button-secondary" variant="link" onClick={() => this.onLoggedOut()}>
                  LOGOUT
                </Button>

              </Nav>
            </Navbar>
            <br />
            <br />
            <br />

            <Route exact path="/client" render={() => {
              if (!user)
                return (
                  <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                );

              return <MoviesList movies={movies} />;
            }} />

            <Route path="/register" render={() => <RegistrationView />} />

            <Route path="/movies/:movieId" render={
              ({ match }) => <MovieView
                movie={
                  movies.find(m => m._id === match.params.movieId)
                }
                favoriteMovies={this.state.favoriteMovies}
              />
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

            <Route exact path='/user/:Username'
              render={
                () => <ProfileView movies={movies} />
              }
            />
            <br />
          </div >
        </Container>
      </Router >
    );
  }
}

let mapStateToProps = state => {
  return { movies: state.movies }
}

export default connect(mapStateToProps, { setMovies })(MainView);

