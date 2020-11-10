import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
//import Animated from 'react-css-animated';

import { Link } from "react-router-dom";

import './movie-card.scss';


export class MovieCard extends React.Component {



  render() {
    const { movie } = this.props;
    //  console.log(this.props)

    return (
      //<div onClick={() => onClick(movie)} className="movie-card">  {movie.Title}</div>
      <div>
        <br />
        <Card style={{ width: '100%' }}>
          <Card.Img variant="top" src={movie.ImagePath} />
          <Card.Body className="container-box" style={{ margin: '0px' }}>
            <Card.Title>{movie.Title}</Card.Title>
            <Card.Text>{movie.Description}</Card.Text>
            <Card.Footer>
              <Link to={`/movies/${movie._id}`}>
                <Button className="button-primary" variant="link">Open</Button>
              </Link>

            </Card.Footer>
          </Card.Body>
        </Card>
        <br />
      </div>
    );
  }
}
/* <Button onClick={() => onClick(movie)} variant="link">Open</Button> removed as throws error
MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string.isRequired
    }),
    ImagePath: PropTypes.string.isRequired
  }).isRequired,
  onClick: PropTypes.func.isRequired
}; */

//Animation

/*constructor() {
  super();

  this.state = {
    favorite: undefined, //should be this.state of the movie_id
    animateFav: true
  };
}

unmount = true;

componentDidMount() {
  const { movies, favorites } = this.props;
  const component = this;
  this.unmount = false;
  var search = favorites.find(e => { return e._id === movies._id }) // how to address each movie id here?

  if (search) {
    component.setState({
      favorite: true,
      animateFav: true
    })
  }
  else {
    component.setState({
      favorite: false,
    })
  }
}*/

//<Animated> isVisible={this.state.animateFav}
//<Animated>
//  <Button className="button-secondary" variant="link">My Favorite</Button>
//</Animated>