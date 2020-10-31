import React from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { Link } from "react-router-dom";

import './director-view.scss';

export class DirectorView extends React.Component {

  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { movies, director } = this.props;

    if (!dirctor) return null;

    return (
      <Container className="container-box">
        <Card style={{ width: '16rem' }}>
          <Card.Body>
            <Card.Title>{director.Name}</Card.Title>
            <Card.Text>Bio: {director.Bio}</Card.Text>
            <Card.Text>Born: {director.Birth}</Card.Text>
            <Card.Text>Died: {director.Death}</Card.Text>
            <Link to={`/`}>
              <Button variant="link">CLOSE</Button>
            </Link>
          </Card.Body>
        </Card>
      </Container>
    );
  }
};