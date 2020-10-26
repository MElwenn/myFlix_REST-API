import React from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { Link } from "react-router-dom";

import './movie-card.scss';

export class GenreView extends React.Component {

  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { movies, genre } = this.props;

    if (!genre) return null;

    return (
      <Container className="container-box">
        <Card style={{ width: '32rem' }}>
          <Card.Body>
            <Card.Title>{genre.Name}</Card.Title>
            <Card.Text>Description: {genre.Description}</Card.Text>
            <Link to={`/`}>
              <Button variant="link">CLOSE</Button>
            </Link>
          </Card.Body>
        </Card>
      </Container>
    );
  }
};