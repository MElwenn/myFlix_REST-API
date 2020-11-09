import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';
import './movie-view.scss';

function backButton() {
  alert('Clicked!');
}

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
            <Card.Text>Genre: {movie.Genre.Name}</Card.Text>
            <Card.Text>Director: {movie.Director.Name}</Card.Text>
            <div>
              <Link to={`/movies/genres/${movie.Genre.Name}`}>
                <Button className="button-primary" variant="link">Genre</Button>
              </Link>
              <Link to={`/movies/directors/${movie.Director.Name}`}>
                <Button className="button-primary" variant="link">Director</Button>
              </Link>
              <Link to={`/`}>
                <Button className="button-primary" variant="link">Back</Button>
              </Link>
            </div>
          </Card.Body>
        </div>

      </Card>
    );
  }
}
