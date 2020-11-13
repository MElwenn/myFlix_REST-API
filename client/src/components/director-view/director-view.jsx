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
    const { movie, director } = this.props;

    if (!director) return null;

    return (
      <Container className="container-box">
        <div className="director-view">
          <Card className="container-box" style={{ width: '70%' }}>
            <Card.Body>
              <Card.Title>{director.Name}</Card.Title>
              <Card.Text>Bio: {director.Bio}</Card.Text>
              <Card.Text>Born: {director.Birth}</Card.Text>
              <Card.Text>Died: {director.Death}</Card.Text>
              <Link to={`/`}>
                <Button className="link-text" variant="link">CLOSE</Button>
              </Link>
            </Card.Body>
          </Card>
        </div>
      </Container>
    );
  }
};