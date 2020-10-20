import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { response } from 'express';

export function RegistrationView() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthdate, setBirthdate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const createdUser = {
      Username: username,
      Password: password,
      Email: email,
      Birthdate: birthdate
    }
  };

  axios.post('<https://movie-api-elwen.herokuapp.com/users>')
    .then((response) => {
      console.log(response);
      console.log(reponsedata);
      alert('User has been registered successfully.');
      window.open('/client', '_self');
    })
    .catch((e) => {
      console.log(e.response);
      alert('Error on request');
    });
};

// Instead of this return function a registration form is needed (=> install bootstrapReact first)
return (
  <form>
    <label>
      Username:
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
    </label>
    <label>
      Password:
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
    </label>
    <button type="button" onClick={handleSubmit}>Submit</button>
  </form>
);


RegistrationView.propTypes = {  // why RegistrationView is yellow whereas in other components it's cyan?
  user: PropTypes.shape({
    Username: PropTypes.string,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthdate: PropTypes.string.isRequired // is this really a string or rather a date?
  }).isRequired,
  onClick: PropTypes.func.isRequired
};