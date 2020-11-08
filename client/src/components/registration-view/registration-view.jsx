import React, { useState } from 'react';
//import PropTypes from 'prop-types';
import axios from 'axios';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

import './registration-view.scss';

export function RegistrationView() {  //function component with hooks
  //export class RegistrationView extends React.Component {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthdate, setBirthdate] = useState('');

  const handleSubmit = (e) => {  //Send a request to the server for authentication
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
        //const data = response.data;
        alert('You signed up successfully, please login.');
        console.log(data);
        window.open('/client', '_self'); // the second argument '_self' is necessary so that the page will open in the current tab
      })
      .catch((e) => {
        console.log('Error. Your sign up was not successful.');
        //alert('Error. Sign up failed.');
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

        {/*<Form.Group>
          <Form.Label>Birthdate</Form.Label>
          <Form.Control
            type="date"
            placeholder="Your day of birth (dd.mm.yyyy)"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
          />
        </Form.Group>*/}

        <Button className="button-primary" variant="dark" type="submit" onClick={handleSubmit}>
          SIGN UP
        </Button>
        {/*<Link to={`/login`}>
           <Button className="button-secondary">LOGIN</Button>
         </Link>*/}
      </Form>
    </Container>
  );
};


// OLD code
/*const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post('https://movie-api-elwen.herokuapp.com/users', {
        Username: username,
        Password: password,
        Email: email,
        Birthdate: birthdate,
      })
      .then((response) => {
        const data = response.data;
        alert('You signed up successfully, please login.');
        console.log(data);
        window.open('/client', '_self');
      })
      .catch((e) => {
        console.log('error registering the user');
      });
  };

  axios.post(`https://movie-api-elwen.herokuapp.com/users`, createdUser, {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    })
      .then(response => {
        const data = response.data;
        console.log(data);
        window.open('/', '_self');
      })
      .catch(e => {
        console.log('error registering the user')
      });

        // do I have to wrap 'render() {}' around the 'return()' ?
  //render() {  //render the search result from GET all movies
  // const { movies, createdUser } = this.state;

  // Before the movies have been loaded
  // if (!movies)
  //  return <div className="main-view" />;

  */