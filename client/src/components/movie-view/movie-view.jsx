import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button, Card, ButtonGroup } from 'react-bootstrap';
import BootstrapSwitchButton from 'bootstrap-switch-button-react'

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

  // allows a user to add favorite movie to the profile view or remove it from there 
  updateFavoriteMovieList(eventKey) {
    var token = localStorage.getItem('token')
    console.log("changed=====", eventKey)
    if (eventKey) {
      this.addFavorites();
    }
    else {
      console.log("deleted========")
      this.removeFavorites();
    }
  }

  addFavorites = () => {
    const { movie } = this.props
    const userName = localStorage.getItem('user')
    axios.post(`https://movie-api-elwen.herokuapp.com/users/${userName}/movies/${movie._id}`, {}, {
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` },
    })
      .then((response) => {
        localStorage.setItem('favoriteMovies', response.data.FavoriteMovies)
        alert('Movie was added to your Favorites List.');
        window.open('/', '_self');

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
    const { movie } = this.props;
    const { user } = this.props;
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
                as={Link} to={`/user/${user}`}
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

