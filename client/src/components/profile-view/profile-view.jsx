import React, { useState } from 'react';
//import React from 'react';
//import PropTypes from 'prop-types';
import axios from 'axios';

import Container from 'react-bootstrap/Container';
//import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

import './profile-view.scss';

export class ProfileView extends React.Component {
  //export default class ProfileView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {   // Initialize the state to an empty object to destructure it later
      Username: null,
      Password: null,
      Email: null,
      Birthdate: null,
      FavoriteMovies: []
    };
  }
  componentDidMount() {
    const accessToken = localStorage.getItem('token');
    this.getUser(accessToken);
  }

  getUser(token) {
    const username = localStorage.getItem('user');

    axios  //Displays users profile and favorite movies
      .get(`https://movie-api-elwen.herokuapp.com/users/${username}`, {
        headers: { Authorization: 'Bearer ${token}' }
      })
      .then((response) => {
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthdate: response.data.Birthdate,
          FavoriteMovies: response.data.FavoriteMovies
        });
      })
      .catch(function err() {
        console.log(err);
      });
  };

  updateProfile(props) {
    const [Username, updateUsername] = useState('');
    const [Password, updatePassword] = useState('');
    const [Email, updateEmail] = useState('');
    const [Birthdate, updateBirthdate] = useState('');
    const [FavoriteMovies, updateFavoriteMovies] = useState('');

    const handleUpdate = (e) => {
      e.preventDefault();
      console.log();

      axios  //Allows users to update their user info (username, password, email, date of birth, favorite movies)
        .put(`https://movie-api-elwen.herokuapp.com/users/${localStorage.getItem('user')}`,
          {
            Username: Username,
            Password: Password,
            Email: Email,
            Birthdate: Birthdate,
            FavoriteMovies: FavoriteMovies
          },
          {
            headers: { Authorization: `Bearer ${localStorage.postItem('token')}` }
          }
            .then((response) => {
              const data = response.data;
              console.log(data);
              alert('Your profile was updated successfully, please login.');
              localStorage.postItem(
                'token',
                'user',
                'password',
                'email',
                'birthdate',
                'favoriteMovies'
              );
              window.open('/client', '_self');
            })
            .catch((e) => {
              alert('Error. Your update was not successful.');
            })
        );
    }
  }

  deleteProfile(e) {
    axios  //Allows existing users to deregister
      .delete(`<https://movie-api-elwen.herokuapp.com/users/${localStorage.getItem('user')}>`,
        //.delete(`<https://movie-api-elwen.herokuapp.com/users/${localStorage.getItem(user)}>`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
      .then((response) => {
        alert('Your acount including all user data was deleted successfully.');
        localStorage.removeItem('token', 'user');
        window.open('/');
      })
      .catch((e) => {
        alert('Error. Your account could not be deleted.');
      });
  }

  deleteFavoriteMovie(_id) {
    //deleteFavoriteMovie(e) {
    console.log(this.props.movies);

    axios  //Allows users to remove a movie from their list of favorites
      .delete(`<https://movie-api-elwen.herokuapp.com/users/${localStorage.getItem('user')}/Movies/${_id}>`,
        //.delete(`<https://movie-api-elwen.herokuapp.com/users/${localStorage.getItem(user)}/Movies/${_id}>`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
      .then((response) => {
        alert('Movie has been removed from your fovorites list.');
        localStorage.removeItem('token', 'user');
        window.open('/client', '_self');
      })
      //.catch((_id) => {
      .catch((e) => {
        alert('Error. Movie could not be removed from your favorites list.');
      });
  }

  render() {
    const { Username } = this.props;
    const { Password } = this.props;
    const { Email } = this.props;
    const { Birthdate } = this.props;
    const { movies } = this.props;
    //const { FavoriteMovies } = this.props;
    const FavoriteMovies = movies.filter(
      (movie) => this.state.FavoriteMovies.includes(movie._id)
    );
    const { handleUpdate } = this.props;

    return (
      <div className="profile-view" >
        <Container className="container-box" >
          <br />
          <h1> My Profile</h1>
          <br />
          <Form>
            <Form.Group controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Firtstname blank Lastname"
                value={Username}
                onChange={(e) => updateUsername(e.target.value)}
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
                value={Password}
                onChange={(e) => updatePassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                value={Email}
                onChange={(e) => updateEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicBirthdate">
              <Form.Label>Birthdate</Form.Label>
              <Form.Control
                type="birthdate"
                placeholder="30.09.1999"
                value={Birthdate}
                onChange={(e) => updateBirthdate(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicFavoriteMovies">
              <Form.Label>Favorite Movie</Form.Label>
              <Form.Control
                type="favoriteMovies"
                placeholder="Add Favorite Movie"
                value={FavoriteMovies}
                onChange={(e) => updateFavoriteMovies(e.target.value)}
              />
            </Form.Group>

            <Button
              className="button-primary"
              variant="dark"
              type="submit"
              onClick={handleUpdate}>
              UPDATE PROFILE
            </Button>
          </Form>
          <br />
          <br />

          <Button className='button-secondary' variant='dark' onClick={() => this.deleteUser()}>
            DELETE ACCOUNT
          </Button>

          <Link to={`/`}>
            <Button className='button-primary' variant='dark'>CLOSE</Button>
          </Link>

        </Container>
      </div>
    )
  }
}
