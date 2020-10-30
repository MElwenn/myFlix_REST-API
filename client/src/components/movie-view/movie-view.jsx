import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';
import './movie-view.scss';

function backButton() {
  alert('Clicked!');
}

//const backButton = () => (
//  <div>
//    <Link to="/"> Back </Link>
//  </div>
//)

export class MovieView extends React.Component {

  constructor() {
    super();

    this.state = {};
  }


  render() {
    const { movie } = this.props;
    // const button = backButton.button;

    // <button onClick={backButton}>Back</button>;

    if (!movie) return null;

    return (
      <div className="movie-view">
        <img className="movie-poster" src={movie.ImagePath} />
        <div className="movie-title">
          <span className="label">Title: </span>
          <span className="value">{movie.Title}</span>
        </div>
        <div className="movie-description">
          <span className="label">Description: </span>
          <span className="value">{movie.Description}</span>
        </div>

        <div className="movie-genre">
          <span className="label">Genre:
            <Link to={`/genres/${movie.Genre.Name}`}>
              <Button className="button-secondary" variant="link">Genre</Button>
            </Link>
          </span>
          <span className="value">{movie.Genre.Name}</span>
        </div>
        <div className="movie-director">
          <span className="label">Director:
            <Link to={`/directors/${movie.Director.Name}`}>
              <Button className="button-primary" variant="link">Director</Button>
            </Link>
          </span>
          <span className="value">{movie.Director.Name}</span>
        </div>
        <div>
          <a href="http://localhost:1234/">Back</a>
        </div>
      </div>
    );

    //<Button>Back</Button>

    //<button onClick={backButton}>Back</button>

    //<div>
    //  <Link to="/"> Back </Link>
    //</div>



    //
    //<div>
    //  <Link to={"/"}>Back
    //    <Button className="button-back">Back</Button>
    //  </Link>
    //</div>


  }
}

//Do I have to add propTypes here? "While you’re at it, add propTypes for your other components, as well (and any other components you create in the future!)"