import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router, Link, Route } from "react-router-dom";

import { setMovies } from '../../actions/actions';  //import actions for Redux

import MoviesList from '../movies-list/movies-list';
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

//export default class MainView extends React.Component { 
// 3.5-export to be replaced by export default connect(mapStateToProps (line 178) 
//as Only one default export allowed per module
class MainView extends React.Component {
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
        //this.setState({   // working 3.5 code (Assign the result to the state)
        this.props.setMovies(response.data); // #1"the movies live in the store now" potentially NOT working 3.6 code (throws errors)
        movies: response.data
        //});               // working 3.5 code (Assign the result to the state)
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

    //const { movies, user } = this.state; // working 3.5 code
    // connect actions to the MainView (wrapping inputs and outputs to a component)
    let { movies } = this.props;       // THIS is what's proposed in 3.6
    let { user } = this.state;         // THIS is what's proposed in 3.6

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

                <Nav.Link as={Link} to={`/user/${user}`}>
                  Profile
                </Nav.Link>

                {/*<Nav.Link as={Link} to='/login'>
                 Login
                </Nav.Link>*/}

              </Nav>
            </Navbar>
            <br />

            <Route exact path="/" render={() => {
              if (!user)
                return (
                  <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                );
              //return movies.map((m) => <MovieCard key={m._id} movie={m} />);  // working 3.5 code
              return <MoviesList movies={movies} />; // 3.6 code
            }} />

            <Route path="/register" render={() => <RegistrationView />} />

            {/*<Route path="/login" render={() => <LoginView />} />*/}

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

            <Route exact path='/user/:Username'
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

let mapStateToProps = state => {
  return { movies: state.movies }
}

export default connect(mapStateToProps, { setMovies })(MainView);

