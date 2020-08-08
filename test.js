const express = require('express'),
  bodyParser = require('body-parser'),
  uuid = require('uuid');

const app = express();

app.use(bodyParser.json());

let movies = [
  {
    id: 1,
    title: 'Snatch',
    classes: {
      director: 'Guy Ritchie',
      year: '2000',
      genre: 'Crime-Comedy',
      description: 'Snatch is a 2000 British crime comedy film written and directed by Guy Ritchie, featuring an ensemble cast. Set in the London criminal underworld, the film contains two intertwined plots: one dealing with the search for a stolen diamond, the other with a small-time boxing promoter (Jason Statham) who finds himself under the thumb of a ruthless gangster (Alan Ford) who is ready and willing to have his subordinates carry out severe and sadistic acts of violence.',
      imageUrl: 'https://picsum.photos/200/300.jpg',
      featured: 'Yes.'
    }
  },
  {
    id: 2,
    title: 'Pulp Fiction',
    classes: {
      director: 'Quentin Tarantino',
      year: '1994',
      genre: 'Crime-Comedy',
      description: 'Pulp Fiction is a 1994 American neo-noir black comedy crime drama film written and directed by Quentin Tarantino, who conceived it with Roger Avary.[4] Starring John Travolta, Samuel L. Jackson, Bruce Willis, Tim Roth, Ving Rhames, and Uma Thurman, it tells several stories of criminal Los Angeles. The title refers to the pulp magazines and hardboiled crime novels popular during the mid-20th century, known for their graphic violence and punchy dialogue.',
      imageUrl: 'https://picsum.photos/200/300.jpg',
      featured: 'Yes.'
    }
  },
  {
    id: 3,
    title: 'Fargo',
    classes: {
      director: 'Ethan Coen, Joel Coen',
      year: '1996'
      genre: 'Comedy-Thriller',
      description: 'Fargo is a 1996 black comedy thriller film written, produced and directed by Joel and Ethan Coen. Frances McDormand stars as Marge Gunderson, a pregnant Minnesota police chief investigating roadside homicides that ensue after a desperate car salesman (William H. Macy) hires two criminals (Steve Buscemi and Peter Stormare) to kidnap his wife in order to extort a hefty ransom from his wealthy father-in-law (Harve Presnell). The film was an international co-production between the United States and United Kingdom.',
      imageUrl: 'https://picsum.photos/200/300.jpg',
      featured: 'Yes.'
    }
  }
];

// Definitions
let director = Object.values(movie.classes); // Object.values() filters out object's keys and keeps the values that are returned as a new array
let genre = Object.values(movie.classes);
let description = Object.values(movie.classes);
let imageUrl = Object.values(movie.classes);


// Gets the list of data about ALL movies

app.get('/movies', (req, res) => {
  res.json(movies);
});
// Gets the data about a single movie, by title


// GET data (Title, Director, Genre, Description, Image URL) about a single movie
//app.get('/movies/:title', (req, res) => {
//  res.json(movies.find((movie) => { return movies.title === req.params.title }));//,
//          movies.director === req.params.director,
//          movies.genre === req.params.genre,
//          movies.description === req.params.description,
//          movies.imageUrl === req.params.imageUrl
//    })
//  );
//});


// Gets the GPA of a student
app.get('/movies/:title', (req, res) => {
  let movie = movies.find((movie) => { return movie.title === req.params.title });

  if (movie) {
    Object.values(movie.classes); // Object.values() filters out object's keys and keeps the values that are returned as a new array
    
    console.log(director);
    console.log(genre);
    console.log(description);
    console.log(imageUrl);

    res.status(201).send('Successful!' + 'Director: ' + director + 'Genre: ' genre + 'Description: ' description +  'Sorry, no Image: ' imageUrl);

  } else {
    res.status(404).send('Movie with the title ' + req.params.title + ' was not found.');
  }
});

app.listen(8080, () => {
  console.log('Your app is listening on port 8080');
});
