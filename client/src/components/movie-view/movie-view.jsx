import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button, Card, ButtonGroup } from 'react-bootstrap';
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
//import Animated from 'react-css-animated';

import './movie-view.scss';

export class MovieView extends React.Component {

  constructor() {
    super();

    this.state = {
      favoriteMovies: []
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    let favoriteMovies = localStorage.getItem('favoriteMovies');
    this.setState({ favoriteMovies: favoriteMovies.split(',') })
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
    }
  }

  // returns true or false for favMovies
  isInFavorites = () => {
    const { movie } = this.props;
    const { favoriteMovies } = this.state
    if (!favoriteMovies || !favoriteMovies.length) return false
    console.log(favoriteMovies)
    const exists = favoriteMovies.filter(favorite => favorite == movie._id)

    return exists.length > 0
  }

  // re-added ther former verion inbetween

  updateFavoriteMovieList(eventKey) {
    var token = localStorage.getItem('token')
    console.log("changed=====", eventKey)
    if (eventKey) {
      this.addFavorites();
      //this.isInFavorites() // Attempt1 to keep favorite Movies in the localStorage
      //const buttonState = localStorage.setItem('true'); Attempt4 to keep favorite Movies in the localStorage
    }
    else {
      console.log("deleted========")
      this.removeFavorites();
      //this.isInFavorites() // Attempt1 to keep favorite Movies in the localStorage
      //const buttonState = localStorage.setItem('false'); Attempt4 to keep favorite Movies in the localStorage
    }
    //Attempt3 to keep favorite Movies in the session storage (=> sessionStarage is killed at the end of session !!! =bad)
    //Storage.prototype.setFavoriteMovieList = function (key, obj) {
    //  return this.setItem(key, JSON.stringify(obj))
    //}
  }

  // re-added ther former verion inbetween

  addFavorites = () => {
    const { movie } = this.props
    const userName = localStorage.getItem('user')
    axios.post(`https://movie-api-elwen.herokuapp.com/users/${userName}/movies/${movie._id}`, {}, {
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` },
    })
      .then((response) => {
        localStorage.setItem('favoriteMovies', response.data.FavoriteMovies)
        alert('Movie was added to your Favorites List.');
        window.open('/user/:Username', '_self');
      })
      .catch((e) => {
        alert('Error. Your update was not successful.');
      })
  }

  removeFavorites = () => {
    const { movie } = this.props
    const userName = localStorage.getItem('user')
    axios.delete(`https://movie-api-elwen.herokuapp.com/users/${userName}/movies/${movie._id}`, {
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` },
    })
      .then((response) => {
        localStorage.setItem('favoriteMovies', response.data.FavoriteMovies)
        alert('Movie was deleted from your Favorites List.');
        window.open('/', '_self');
      })
      .catch((e) => {
        alert('Error. Your update was not successful.');
      })
  }

  render() {
    const { movie } = this.props;  //Why: 'favoriteMovies' is declared but its value is never read.
    if (!movie) return null;
    return (
      <Card className="container-box" style={{ width: '100%' }}>
        <div className="movie-view">
          <Card.Img variant="top" src={movie.ImagePath} />
          <Card.Body className="container-box" style={{ margin: '0px' }}>

            <Card.Title>{movie.Title}</Card.Title>
            <Card.Text>Derscription: {movie.Description}</Card.Text>
            <Card.Text>
              <Link className="link-text" to={`/movies/genres/${movie.Genre.Name}`}>
                Genre: {movie.Genre.Name}
              </Link>
            </Card.Text>
            <Card.Text>
              <Link className="link-text" to={`/movies/directors/${movie.Director.Name}`}>
                Director: {movie.Director.Name}
              </Link>
            </Card.Text>
            <Card.Text>Favorite: </Card.Text>
            <Card.Footer>
              <BootstrapSwitchButton
                onlabel="Yes"
                offlabel="No"
                onstyle="dark"
                offstyle="light"
                style="button-primary-toggle"
                checked={this.isInFavorites()}
                size="lg"
                width={100}
                
                onChange={(eventKey) => this.updateFavoriteMovieList(eventKey)}
                 
              >
              </BootstrapSwitchButton>
              <Link to={`/`}>
                <Button className="button-primary" variant="link">Back</Button>
              </Link>
            </Card.Footer>

          </Card.Body>
        </div>
      </Card>
    );
  }
}

// Akunnas version: /*onChange={(eventKey) => eventKey ? this.addFavorites : this.removeFavorites}*/

//before animation was added
/*constructor() {
  super();

  this.state = {};
}*/

//Removed as too many buttons
//<Button className="button-primary" variant="link">Genre</Button>
//<Button className="button-primary" variant="link">Director</Button>

/*
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
*/
/*
{
  this.state.favorite ?
    <Animated isVisible={this.state.animateFav}>
      <BootstrapSwitchButton checked={true} className="button-primary" />Favorite
      <Button onClick={() => this.setFavorite(movie)} className="button-primary">My Favorite</Button>
    </Animated> :
    <Animated>
      <Button onClick={() => this.setFavorite(movie)} className="button-secondary">Add to Favorites</Button>
    </Animated>
}
*/

//Logic for animation approach
/*
    componentDidMount() {
      const { movie, favorites } = this.props;
      const component = this;

      var search = favorites.find(e => { return e._id === movie._id }); // what's missing? error: "Cannot read property 'find' "

      if (search) {
        component.setState({
          favorite: true,
          //animateFav: true
        })
      }
      else {
        component.setState({
          favorite: false,
        })
      }
    }

    setFavorite(movie) {
      var token = localStorage.getItem('token');
      const { updateFavorites } = this.props;
      const component = this;

      if (this.state.favorite) {
        axios({
          method: 'delete', url: `https://movie-api-elwen.herokuapp.com/movies${movie._id}`,
          headers: {
            Authorization: `Bearer ${token}`
          },
        })
          .then(response => {
            updateFavorites()
            component.setState({
              favorite: false,
            })
          })
          .catch(function (error) {
            console.log(error)
          })
      }
      else {
        axios({
          method: 'post', url: `https://movie-api-elwen.herokuapp.com/movies${movie._id}`,
          headers: {
            Authorization: `Bearer ${token}`
          },
        })
          .then(response => {
            updateFavorites()
            component.setState({
              favorite: true,
              //animateFav: false
            })
            component.setState({
              animateFav: true
            })
          })
          .catch(function (error) {
            console.log(error)
          })
      }
    }*/

// IF ELSE approach
// IF favMovie [] ==='' favorite: false, checked={false}
/*const favoriteMovie = movies.filter(
  (movie) => this.state.FavoriteMovies.includes(movie._id)
);

if (this.state.favoriteMovie === '') {
  console.log('No favorite movie');
  component.setState({
    favorite: false,
    checked: false
  })
}
// ELSE favorite: true, checked={true}
else {
  console.log(FavoriteMovies);
  component.setState({
    favorite: true,
    checked: true
  })
}*/
// Event-listener toggle button => onChange 
  // call fct addFavoriteMovie(_id), favorite: true, checked={true}

  // Event-listener toggle button => onChange 
  // call fct addFavoriteMovie(_id), favorite: true, checked={true}


// stateToProps Approach
/*const favorite = state => {
  const { favorite } = state;
  return { favorite };
};

function favorite(props) {
  const { movies, favorite } = props;
  let favMovies = movies;

  if (favorite !== '') {
    favMovies = movies.filter(m => m.Title.includes(favorite));
  }
  */
 //export default connect(null, { favMovies })(favorite);

