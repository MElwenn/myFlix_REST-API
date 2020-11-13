import React, { useState } from 'react';
import axios from 'axios';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import './login-view.scss';

export function LoginView(props) {  //function component with hooks
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('https://movie-api-elwen.herokuapp.com/login', {
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
  };

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

        <Button className="button-primary" variant="link" type="submit" onClick={handleSubmit}>
          LOGIN
        </Button>

      </Form>
    </Container>
  );
};


