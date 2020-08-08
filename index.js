const express = require('express'); // Import express package
const app = express(); // variable that encapsulates Express’s functionality to configure the web server
const bodyParser = require('bodyParser'); // require the body-parser module
const methodOverride = require('method-override');
const morgan = require('morgan'); // logging middleware
const uuid = require('uuid'); // generates a Universally Unique Identifier

// set time stamp
let requestTime = (req, res, next) => {
  req.requestTime = Date.now();
  next();
};

// GET requests
//app.get('/', (req, res) => {
//  let responseText = 'Welcome to my movie app!';
//  responseText += '<small>Requested at: ' + req.requestTime + '</small>';
//  res.send(responseText);
//});

app.get('/secreturl', (req, res, next) => {
  res.send('This is a secret url with super top-secret content.');
});

// GET the list of data about ALL movies
app.get('/movies', (req, res) => {
  res.json(movies);
});

// GET data (Title, Director, Genre, Description, Image URL) about a single movie
app.get('/movies/:title', (req, res) => {
  res.json(movies.find((movie) =>
    { return
          movies.title === req.params.title,
          movies.director === req.params.director,
          movies.genre === req.params.genre,
          movies.description === req.params.description,
          movies.imageUrl === req.params.imageUrl
    })
  );
});

// GET public documentation
app.get('/documentation', (req, res) => {
  res.sendFile('public/documentation.html', { root: __dirname });
});

// POST requests
// Adds data for a new movie to the list of favorite movies
app.post('/movies', (req, res) => {
  let newMovie = req.body;

  if (!newMovie.title) {
    const message = 'Missing movie-title in request body';
    res.status(400).send(message);
  } else {
    newMovie.id = uuid.v4();
    movies.push(newMovie);
    res.status(201).send(newMovie);
  }
});

// DELETE requests
// Deletes a new movie from the list of favorite movies
app.delete('/movies/:id', (req, res) => {
  let movie = movies.find((movie) => { return movie.id === req.params.id });

  if (movie) {
    movies = movies.filter((obj) => { return obj.id !== req.params.id });
    res.status(201).send('Movie ' + req.params.id + ' was deleted from your list.');
  }
});


// middleware components
app.use(express.static('public')); // invoke files from the public folder
app.use(morgan('common'));         // logging
//app.use(myLogger);               // presumably replaced by morgan
app.use(requestTime);

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());
app.use(methodOverride());

// error handling middleware function using express
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server ERROR occured!');
});

// JSON object containing data about your top 10 movies
let movies = [
  {
    title: 'Snatch',
    director: 'Guy Ritchie',
    year: '2000',
    genre: 'Crime-Comedy',
    description: 'Snatch is a 2000 British crime comedy film written and directed by Guy Ritchie, featuring an ensemble cast. Set in the London criminal underworld, the film contains two intertwined plots: one dealing with the search for a stolen diamond, the other with a small-time boxing promoter (Jason Statham) who finds himself under the thumb of a ruthless gangster (Alan Ford) who is ready and willing to have his subordinates carry out severe and sadistic acts of violence.',
    imageUrl: 'https://picsum.photos/200/300.jpg',
    featured: 'Yes.'
  },
  {
    title: 'Pulp Fiction',
    director: 'Quentin Tarantino',
    year: '1994',
    genre: 'Crime-Comedy',
    description: 'Pulp Fiction is a 1994 American neo-noir black comedy crime drama film written and directed by Quentin Tarantino, who conceived it with Roger Avary.[4] Starring John Travolta, Samuel L. Jackson, Bruce Willis, Tim Roth, Ving Rhames, and Uma Thurman, it tells several stories of criminal Los Angeles. The title refers to the pulp magazines and hardboiled crime novels popular during the mid-20th century, known for their graphic violence and punchy dialogue.',
    imageUrl: 'https://picsum.photos/200/300.jpg',
    featured: 'Yes.'
  },
  {
    title: 'Fargo',
    director: 'Ethan Coen, Joel Coen',
    year: '1996'
    genre: 'Comedy-Thriller',
    description: 'Fargo is a 1996 black comedy thriller film written, produced and directed by Joel and Ethan Coen. Frances McDormand stars as Marge Gunderson, a pregnant Minnesota police chief investigating roadside homicides that ensue after a desperate car salesman (William H. Macy) hires two criminals (Steve Buscemi and Peter Stormare) to kidnap his wife in order to extort a hefty ransom from his wealthy father-in-law (Harve Presnell). The film was an international co-production between the United States and United Kingdom.',
    imageUrl: 'https://picsum.photos/200/300.jpg',
    featured: 'Yes.'
  },
  {
    title: 'The Cabin in the Woods',
    director: 'Drew Goddard',
    year: '2011',
    genre: 'Horror-Comedy',
    description: 'The Cabin in the Woods is a 2011 American horror comedy film directed by Drew Goddard in his directorial debut, produced by Joss Whedon, and written by Whedon and Goddard.[4] The film stars Kristen Connolly, Chris Hemsworth, Anna Hutchison, Fran Kranz, Jesse Williams, Richard Jenkins, and Bradley Whitford. The plot follows a group of college students who retreat to a remote forest cabin where they fall victim to backwoods zombies while technicians manipulate events from an underground facility.',
    imageUrl: 'https://picsum.photos/200/300.jpg',
    featured: 'Yes.'
  },
  {
    title: '28 days later',
    director: 'Danny Boyle',
    year: '2002',
    genre: 'Horror',
    description: '28 Days Later is a 2002 British post-apocalyptic horror film directed by Danny Boyle, written by Alex Garland, and starring Cillian Murphy, Naomie Harris, Christopher Eccleston, Megan Burns, and Brendan Gleeson. The plot depicts the breakdown of society following the accidental release of a highly contagious virus and focuses upon the struggle of four survivors (Murphy, Harris, Burns, and Gleeson) to cope with the destruction of the life they once knew while evading those infected by the virus.',
    imageUrl: 'https://picsum.photos/200/300.jpg',
    featured: 'Yes.'
  },
  {
    title: 'Night on Earth',
    director: 'Jim Jarmush',
    year: '1991',
    genre: 'Comedy',
    description: 'Night on Earth is a 1991 art comedy-drama film written and directed by Jim Jarmusch. It is a collection of five vignettes, taking place during the same night, concerning the temporary bond formed between taxi driver and passenger in five cities: Los Angeles, New York, Paris, Rome, and Helsinki. Jarmusch wrote the screenplay in about eight days, and the choice of certain cities was largely based on the actors with whom he wanted to work.[1] The soundtrack of the same name is by Tom Waits.',
    imageUrl: 'https://picsum.photos/200/300.jpg',
    featured: 'Yes.'
  },
  {
    title: 'Dogville',
    director: 'Lars von Trier',
    year: '2003',
    genre: 'Crime',
    description: 'Dogville is a 2003 crime revenge tragedy film[3] written and directed by Lars von Trier, and starring an ensemble cast led by Nicole Kidman, Lauren Bacall, Paul Bettany, Chloë Sevigny, Stellan Skarsgård, Udo Kier, Ben Gazzara, Harriet Andersson, and James Caan. It is a parable that uses an extremely minimal, stage-like set to tell the story of Grace Mulligan (Kidman), a woman hiding from mobsters, who arrives in the small mountain town of Dogville, Colorado, and is provided refuge in return for physical labor.',
    imageUrl: 'https://picsum.photos/200/300.jpg',
    featured: 'Yes.'
  },
  {
    title: 'Departed',
    director: 'Martin Scorsese',
    year: '2006',
    genre: 'Crime',
    description: 'The Departed is a 2006 American crime film directed by Martin Scorsese and written by William Monahan.[2] It is a remake of the 2002 Hong Kong film Infernal Affairs.[3] The Departed stars Leonardo DiCaprio, Matt Damon, Jack Nicholson, and Mark Wahlberg, with Martin Sheen, Ray Winstone, Vera Farmiga, and Alec Baldwin in supporting roles.',
    imageUrl: 'https://picsum.photos/200/300.jpg',
    featured: 'Yes.'
  },
  {
    title: 'The Empire strikes back',
    director: 'George Lucas',
    year: '2003',
    genre: 'Science Fiction',
    description: 'The Empire Strikes Back, also known as Star Wars: Episode V – The Empire Strikes Back, is a 1980 American epic space opera film directed by Irvin Kershner and written by Leigh Brackett and Lawrence Kasdan, based on a story by George Lucas. Produced by Lucasfilm, it is the second film in the Star Wars film series (albeit the fifth chronologically) and the sequel to Star Wars (1977).[a] Set three years after the events of the first film, the Galactic Empire, under the leadership of Darth Vader and the Emperor, pursues Luke Skywalker and the rest of the Rebel Alliance.',
    imageUrl: 'https://picsum.photos/200/300.jpg',
    featured: 'Yes.'
  },
  {
    title: 'Dune',
    director: 'David Lynch',
    year: '1984',
    genre: 'Science Fiction',
    description: 'Dune is a 1984 American epic science fiction film written and directed by David Lynch and based on the 1965 Frank Herbert novel of the same name. The film stars Kyle MacLachlan (in his film debut) as young nobleman Paul Atreides, and includes an ensemble of well-known American and European actors in supporting roles. It was filmed at the Churubusco Studios in Mexico City and included a soundtrack by the rock band Toto, as well as Brian Eno.',
    imageUrl: 'https://picsum.photos/200/300.jpg',
    featured: 'Yes.'
  }
];

// listen for requests
app.listen(8080, () =>
  console.log('My app is listening on port 8080.'));
//);
