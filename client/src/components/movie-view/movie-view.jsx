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
      <div className="movie-view">
        <img className="movie-poster" src={movie.ImagePath} />
        <div className="movie-title">
          <span className="label">Title: </span>
          <span className="value">{movie.Title}</span>
        </div>
        <div className="movie-description">
          <span className="label">Description: </span>
          <span className="value">{movie.Description}</span>
        </div>

        <div className="movie-genre">
          <span className="label">Genre:
            
          </span>
          <span className="value">{movie.Genre.Name}</span>
        </div>
        <div className="movie-director">
          <span className="label">Director:
          </span>
          <span className="value">{movie.Director.Name}</span>
        </div>
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
      </div>
    );
  }
}
