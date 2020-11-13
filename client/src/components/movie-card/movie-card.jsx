import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { Link } from "react-router-dom";

import './movie-card.scss';


export class MovieCard extends React.Component {

  render() {
    const { movie } = this.props;

    return (
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
