import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
//import Animated from 'react-css-animated';

import './movie-view.scss';

export class MovieView extends React.Component {

  constructor() {
    super();

    this.state = {};
  }


  render() {
    const { movie } = this.props;

    if (!movie) return null;

    return (
      <Card className="container-box" style={{ width: '100%' }}>
        <div className="movie-view">
          <Card.Img variant="top" src={movie.ImagePath} />
          <Card.Body className="container-box" style={{ margin: '0px' }}>

            <Card.Title>{movie.Title}</Card.Title>
            <Card.Text>Derscription: {movie.Description}</Card.Text>
            <Card.Text>
              <Link to={`/movies/genres/${movie.Genre.Name}`}>
                Genre: {movie.Genre.Name}
              </Link>
            </Card.Text>
            <Card.Text>
              <Link to={`/movies/directors/${movie.Director.Name}`}>
                Director: {movie.Director.Name}
              </Link>
            </Card.Text>
            <Card.Text>Favorite: </Card.Text>
            <BootstrapSwitchButton
              checked={false}
              size="lg"
              onstyle="warning"
              width={100}
              onChecked={
                (eventKey) => {
                  props.setFavorite(eventKey);
                }
              }>

            </BootstrapSwitchButton>

            <Card.Footer>
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