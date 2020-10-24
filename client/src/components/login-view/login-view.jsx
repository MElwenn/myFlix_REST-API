import React, { useState } from 'react';
//import PropTypes from 'prop-types';
import axios from 'axios';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

import './login-view.scss';

export function LoginView(props) {  //function component with hooks
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
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
            onChange={(e) => setUsername(e.target.value)}
          />
          <Form.Text className="text-muted">
            We'll never share your personal data with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button className="button-primary" variant="primary" type="submit" onClick={this.handleSubmit}>
          LOGIN
        </Button>
        <Link to={'/registration'}>
          <Button className="button-secondary">SIGN UP</Button>
        </Link>
      </Form>
    </Container>
  );
};
/*LoginView.propTypes = {  // why LoginView is yellow whereas in other components it's cyan?
  user: PropTypes.shape({
    Username: PropTypes.string,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthdate: PropTypes.string.isRequired // is this really a string or rather a date?
  }).isRequired,
  onClick: PropTypes.func.isRequired
};*/
