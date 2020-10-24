import React, { useState } from 'react';
//import PropTypes from 'prop-types';
import axios from 'axios';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

export function RegistrationView() {  //function component with hooks
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthdate, setBirthdate] = useState('');

  const handleSubmit = (e) => {  //Send a request to the server for authentication
    e.preventDefault();

    console.log(username, password);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
    props.onLoggedIn(username);

  };

  // do I have to wrap 'render() {}' around the 'return()' ?
  return (
    <Container className="container-box">
      <Form>
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Firtstname blank Lastname"
            value={username}
            onChange={(e) => createUsername(e.target.value)}
          />
          <Form.Text className="text-muted">
            We'll never share your personal data with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password (8 digits letters and numbers)"
            value={password}
            onChange={(e) => createPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Your Email address"
            value={email}
            onChange={(e) => createEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicBirthdate">
          <Form.Label>Birthdate</Form.Label>
          <Form.Control
            type="date"
            placeholder="Your day of birth (dd.mm.yyyy)"
            value={birthdate}
            onChange={(e) => createBirthdate(e.target.value)}
          />
        </Form.Group>

        <Button className="button-primary" variant="primary" type="submit" onClick={this.handleSubmit}>
          SIGN UP
        </Button>
        <Link to={'/login'}>
          <Button className="button-secondary">LOGIN</Button>
        </Link>
      </Form>
    </Container>
  );
}