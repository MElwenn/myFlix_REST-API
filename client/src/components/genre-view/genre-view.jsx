import React from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { Link } from "react-router-dom";

import './genre-view.scss';

export class GenreView extends React.Component {

  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { movie, genre } = this.props;

    if (!genre) return null;

    return (
      <Container className="container-box">
        <div className="genre-view">
          <Card className="container-box" style={{ width: '70%' }}>
            <Card.Body>
              <Card.Title>{genre.Name}</Card.Title>
              <Card.Text>Description: {genre.Description}</Card.Text>
              <Link className="link-text" to={`/`}>
                <Button className="link-text" variant="link">CLOSE</Button>
              </Link>
            </Card.Body>
          </Card>
        </div>
      </Container>
    );
  }
};