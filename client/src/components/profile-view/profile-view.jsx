//import React, { useState } from 'react';
import React from 'react';
//import PropTypes from 'prop-types';
import axios from 'axios';

import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
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

  updateProfile(e) {
    axios  //Allows users to update their user info (username, password, email, date of birth, favorite movies)
      .put(`<https://movie-api-elwen.herokuapp.com/users>`,
        {
          headers: { Authorization: `Bearer ${localStorage.postItem('token')}` }
        }
          //  {
          //    Username: username,
          //    Password: password,
          //    Email: email,
          //    Birthdate: birthdate,
          //    FavoriteMovies: response.data.FavoriteMovies
          //  })
          .then((response) => {
            const data = response.data;
            alert('Your update was successful, please login.');
            localStorage.postItem(
              'token',
              'user',
              'password',
              'email',
              'birthdate',
              'FavoriteMovies'
            );
            window.open('/client', '_self');
          })
          .catch((e) => {
            alert('Error. Your update was not successful.');
          })
      );
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
    const { movies } = this.props;
    const FavoriteMovies = movies.filter(
      (movie) => this.state.FavoriteMovies.includes(movie._id)
    );

    return (
      <div className="profile-view">
        <Container className="container-box">
          <br />
          <h1> My Profile</h1>
          <br />
          <Card>
            <Card.Body className="container-box">
              <Card.Text>Username: {this.state.Username}</Card.Text>
              <Card.Text>Password: xxxxxxxx</Card.Text>
              <Card.Text>Email: {this.state.Email}</Card.Text>
              <Card.Text>Birthday {this.state.Birthdate}</Card.Text>
              Favorite Movies:
              {FavoriteMovies.map((movie) => (
                <div key={movie._id}>
                  <Link to={`/movies/${movie._id}`}>
                    <Button variant='link'>{movie.Title}</Button>
                  </Link>
                  <Button className='button-primary' variant='dark'
                    onClick={(e) => this.addFavoriteMovie(movie._id)}>
                    ADD MOVIE
                  </Button>
                </div>,
                <div key={movie._id}>
                  <Link to={`/movies/${movie._id}`}>
                    <Button variant='link'>{movie.Title}</Button>
                  </Link>
                  <Button className='button-secondary' variant='dark'
                    onClick={(e) => this.deleteFavoriteMovie(movie._id)}>
                    REMOVE MOVIE
                  </Button>
                </div>
              ))}
              <br />
              <Link to={`/user/update`}>
                <Button className='button-primary' variant='dark'>
                  UPDATE PROFILE
              </Button>
                <br />
                <br />
              </Link>
              <Button className='button-secondary' variant='dark' onClick={() => this.deleteUser()}>
                DELETE ACCOUNT
            </Button>
              <br />
              <br />
              <Link to={`/`}>
                <Button className='button-primary' variant='dark'>CLOSE</Button>
              </Link>
            </Card.Body>
          </Card>
        </Container>
      </div>
    )
  }
}
