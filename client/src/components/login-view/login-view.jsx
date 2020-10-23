import React, { useState } from 'react';
//import PropTypes from 'prop-types';
import axios from 'axios';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

import './login-view.scss';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log(username, password);
    axios.post('https://movie-api-elwen.herokuapp.com/', {
      Username: username,
      Password: password
    })
      .then((response) => {
        const data = response.data;
        props.onLoggedIn(data);
      })
      .catch((e) => {
        console.log('User is unknown.');
      });
    /* Send a request to the server for authentication then call props.onLoggedIn(username)*/
    //props.onLoggedIn(username);
  };
};

return (
  <Container>
    <Form>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
    </Form.Text>
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Form.Group controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" type="submit">
        LOGIN
      </Button>
    </Form>
  </Container>
);

/*LoginView.propTypes = {  // why LoginView is yellow whereas in other components it's cyan?
  user: PropTypes.shape({
    Username: PropTypes.string,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthdate: PropTypes.string.isRequired // is this really a string or rather a date?
  }).isRequired,
  onClick: PropTypes.func.isRequired
};*/
