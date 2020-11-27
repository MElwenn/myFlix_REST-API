import React, { useState } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import './registration-view.scss';

//function component with hooks
export function RegistrationView() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthdate, setBirthdate] = useState('');

  //Send a request to the server for authentication
  const handleSubmit = (e) => {
    e.preventDefault();

    const createdUser = {
      Username: username,
      Password: password,
      Email: email,
      Birthdate: birthdate
    };

    axios
      .post(`https://movie-api-elwen.herokuapp.com/users`, createdUser)
      .then((response) => {
        console.log(response);
        console.log(response.data);
        alert('You signed up successfully, please login.');
        console.log(data);
        window.open('/client', '_self'); // the second argument '_self' is necessary so that the page will open in the current tab
      })
      .catch((e) => {
        console.log('Error. Your sign up was not successful.');
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
            placeholder="Enter password (8 digits letters and numbers)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Your Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Button className="button-primary" variant="link" type="submit" onClick={handleSubmit}>
          SIGN UP
        </Button>
      </Form>
    </Container>
  );
};

