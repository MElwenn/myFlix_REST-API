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

// JSON object containing data about your top 10 movies
let movies = [
  {
    id: 1,
    title: 'Snatch',
    director: 'Guy Ritchie',
    year: '2000',
    genre: 'Crime-Comedy',
    description: 'Snatch is a 2000 British crime comedy film written and directed by Guy Ritchie, featuring an ensemble cast. Set in the London criminal underworld, the film contains two intertwined plots: one dealing with the search for a stolen diamond, the other with a small-time boxing promoter (Jason Statham) who finds himself under the thumb of a ruthless gangster (Alan Ford) who is ready and willing to have his subordinates carry out severe and sadistic acts of violence.',
    imageUrl: 'https://picsum.photos/200/300.jpg',
    featured: 'Yes.'
  },
  {
    id: 2,
    title: 'Pulp Fiction',
    director: 'Quentin Tarantino',
    year: '1994',
    genre: 'Crime-Comedy',
    description: 'Pulp Fiction is a 1994 American neo-noir black comedy crime drama film written and directed by Quentin Tarantino, who conceived it with Roger Avary.[4] Starring John Travolta, Samuel L. Jackson, Bruce Willis, Tim Roth, Ving Rhames, and Uma Thurman, it tells several stories of criminal Los Angeles. The title refers to the pulp magazines and hardboiled crime novels popular during the mid-20th century, known for their graphic violence and punchy dialogue.',
    imageUrl: 'https://picsum.photos/200/300.jpg',
    featured: 'Yes.'
  },
  {
    id: 3,
    title: 'Fargo',
    director: 'Ethan Coen, Joel Coen',
    year: '1996'
    genre: 'Comedy-Thriller',
    description: 'Fargo is a 1996 black comedy thriller film written, produced and directed by Joel and Ethan Coen. Frances McDormand stars as Marge Gunderson, a pregnant Minnesota police chief investigating roadside homicides that ensue after a desperate car salesman (William H. Macy) hires two criminals (Steve Buscemi and Peter Stormare) to kidnap his wife in order to extort a hefty ransom from his wealthy father-in-law (Harve Presnell). The film was an international co-production between the United States and United Kingdom.',
    imageUrl: 'https://picsum.photos/200/300.jpg',
    featured: 'Yes.'
  },
  {
    id: 4,
    title: 'The Cabin in the Woods',
    director: 'Drew Goddard',
    year: '2011',
    genre: 'Horror-Comedy',
    description: 'The Cabin in the Woods is a 2011 American horror comedy film directed by Drew Goddard in his directorial debut, produced by Joss Whedon, and written by Whedon and Goddard.[4] The film stars Kristen Connolly, Chris Hemsworth, Anna Hutchison, Fran Kranz, Jesse Williams, Richard Jenkins, and Bradley Whitford. The plot follows a group of college students who retreat to a remote forest cabin where they fall victim to backwoods zombies while technicians manipulate events from an underground facility.',
    imageUrl: 'https://picsum.photos/200/300.jpg',
    featured: 'Yes.'
  },
  {
    id: 5,
    title: '28 days later',
    director: 'Danny Boyle',
    year: '2002',
    genre: 'Horror',
    description: '28 Days Later is a 2002 British post-apocalyptic horror film directed by Danny Boyle, written by Alex Garland, and starring Cillian Murphy, Naomie Harris, Christopher Eccleston, Megan Burns, and Brendan Gleeson. The plot depicts the breakdown of society following the accidental release of a highly contagious virus and focuses upon the struggle of four survivors (Murphy, Harris, Burns, and Gleeson) to cope with the destruction of the life they once knew while evading those infected by the virus.',
    imageUrl: 'https://picsum.photos/200/300.jpg',
    featured: 'Yes.'
  },
  {
    id: 6,
    title: 'Night on Earth',
    director: 'Jim Jarmush',
    year: '1991',
    genre: 'Comedy',
    description: 'Night on Earth is a 1991 art comedy-drama film written and directed by Jim Jarmusch. It is a collection of five vignettes, taking place during the same night, concerning the temporary bond formed between taxi driver and passenger in five cities: Los Angeles, New York, Paris, Rome, and Helsinki. Jarmusch wrote the screenplay in about eight days, and the choice of certain cities was largely based on the actors with whom he wanted to work.[1] The soundtrack of the same name is by Tom Waits.',
    imageUrl: 'https://picsum.photos/200/300.jpg',
    featured: 'Yes.'
  },
  {
    id: 7,
    title: 'Departed',
    director: 'Martin Scorsese',
    year: '2006',
    genre: 'Crime',
    description: 'The Departed is a 2006 American crime film directed by Martin Scorsese and written by William Monahan.[2] It is a remake of the 2002 Hong Kong film Infernal Affairs.[3] The Departed stars Leonardo DiCaprio, Matt Damon, Jack Nicholson, and Mark Wahlberg, with Martin Sheen, Ray Winstone, Vera Farmiga, and Alec Baldwin in supporting roles.',
    imageUrl: 'https://picsum.photos/200/300.jpg',
    featured: 'Yes.'
  },
  {
    id: 8,
    title: 'Dogville',
    director: 'Lars von Trier',
    year: '2003',
    genre: 'Crime',
    description: 'Dogville is a 2003 crime revenge tragedy film[3] written and directed by Lars von Trier, and starring an ensemble cast led by Nicole Kidman, Lauren Bacall, Paul Bettany, Chloë Sevigny, Stellan Skarsgård, Udo Kier, Ben Gazzara, Harriet Andersson, and James Caan. It is a parable that uses an extremely minimal, stage-like set to tell the story of Grace Mulligan (Kidman), a woman hiding from mobsters, who arrives in the small mountain town of Dogville, Colorado, and is provided refuge in return for physical labor.',
    imageUrl: 'https://picsum.photos/200/300.jpg',
    featured: 'Yes.'
  },
  {
    id: 9,
    title: 'The Empire strikes back',
    director: 'George Lucas',
    year: '2003',
    genre: 'Science Fiction',
    description: 'The Empire Strikes Back, also known as Star Wars: Episode V – The Empire Strikes Back, is a 1980 American epic space opera film directed by Irvin Kershner and written by Leigh Brackett and Lawrence Kasdan, based on a story by George Lucas. Produced by Lucasfilm, it is the second film in the Star Wars film series (albeit the fifth chronologically) and the sequel to Star Wars (1977).[a] Set three years after the events of the first film, the Galactic Empire, under the leadership of Darth Vader and the Emperor, pursues Luke Skywalker and the rest of the Rebel Alliance.',
    imageUrl: 'https://picsum.photos/200/300.jpg',
    featured: 'Yes.'
  },
  {
    id: 10,
    title: 'Dune',
    director: 'David Lynch',
    year: '1984',
    genre: 'Science Fiction',
    description: 'Dune is a 1984 American epic science fiction film written and directed by David Lynch and based on the 1965 Frank Herbert novel of the same name. The film stars Kyle MacLachlan (in his film debut) as young nobleman Paul Atreides, and includes an ensemble of well-known American and European actors in supporting roles. It was filmed at the Churubusco Studios in Mexico City and included a soundtrack by the rock band Toto, as well as Brian Eno.',
    imageUrl: 'https://picsum.photos/200/300.jpg',
    featured: 'Yes.'
  }
];

let genreType = [
  {
    genre: 'Crime',
    definition: 'A crime story can be described as narratives that centre on criminal acts and especially on the investigation, either by an amateur or a professional detective, of a serious crime, generally a murder.'
  },
  {
    genre: 'Comedy',
    definition: 'A comedy film is a category of film in which the main emphasis is on humor. These films are designed to make the audience laugh through amusement and most often work by exaggerating characteristics for humorous effect.'
  },
  {
    genre: 'Horror',
    definition: 'A horror film is a film that seeks to elicit fear for entertainment purposes.'
  },
  {
    genre: 'Science Fiction',
    definition: 'Science fiction is a genre of speculative fiction that typically deals with imaginative and futuristic concepts such as advanced science and technology, space exploration, time travel, parallel universes, and extraterrestrial life.'
  },
  {
    genre: 'Thriller',
    definition: 'Thriller is a genre of fiction, having numerous, often overlapping subgenres. Thrillers are characterized and defined by the moods they elicit, giving viewers heightened feelings of suspense, excitement, surprise, anticipation and anxiety.'
  },
];

let directors = [
  {
    director: 'Guy Ritchie',
    bio: 'Guy Stuart Ritchie (born 10 September 1968) is an English film director, producer, writer, and businessman. His work includes British gangster films and the Sherlock Holmes franchise.',
    birth: '1968',
    death: ''
  },
  {
    director: 'Quentin Tarantino',
    bio: 'Quentin Jerome Tarantino (/ˌtærənˈtiːnoʊ/; born March 27, 1963)[1] is an American film director, screenwriter, producer, and actor.',
    birth: '1963',
    death: ''
  },
  {
    director: 'Joel Coen and Ethan Coen',
    bio: 'Joel Coen (born November 29, 1954)[1] and Ethan Coen (born September 21, 1957), collectively referred to as the Coen brothers, are American film directors, producers, screenwriters, and editors.',
    birth: '1954',
    death: ''
  }
];

let users = [
  {
    user: 'John Doe',
    userFirstName: 'John',
    userLastName:  'Doe',
    userEmail:  'john.doe@web.de',
    userPassword:  'YAq1XSw2',
    userDateOfBirth: '1991-05-01'
  }
];

let usersTopMovie = [
  {
    user: 'John Doe',
    userEmail:  'john.doe@web.de',
    userPassword:  'YAq1XSw2',
    userDateOfBirth: '1991-05-01'
    topMovie: [1]
  }
];


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


// Requests against REST API

app.get('/secreturl', (req, res, next) => {
  res.send('This is a secret url with super top-secret content.');
});

// GET public documentation
app.get('/documentation', (req, res) => {
  res.sendFile('public/documentation.html', { root: __dirname });
});

// Task 2.5 starts here...

// GET the list of data about ALL movies
app.get('/movies', (req, res) => {
  res.send('Successful GET request returning data on all movies');
});

// GET about a single movie by title to the user
app.get('/movies/:title', (req, res) => {
  res.send('Successful GET request returning data on a single movie by title to the user');
});

// GET data about a genre by genreType
app.get('/genreType/:genre', (req, res) => {
  res.send('Successful GET request returning data on a genre and its definition');
});

// GET data about a drector by name
app.get('/directors/:director', (req, res) => {
  res.send('Successful GET request returning data on a director by name');
});

// POST new user and allow to deregister
app.post('/users', (req, res) => {
  res.send('User name is missing in request body. Please add a user name.');
});

// PUT request to update user data
app.put('/users/:user', (req, res) => {
  res.send('User data has been updeted successfully.');
});

// DELETE request to allow user to deregister
app.delete('/users/:user', (req, res) => {
  res.send('User has been deleted successfully.');
});

// POST request to allow a user to add a movie to a favorites list
app.post('/users/:user/movies/:title', (req, res) => {
  res.send('Movie has been added to your favorites list successfully.');
});

// DELETE request to allow a user to remove a movie from the favorites list
app.delete('/users/:user/movies/:title', (req, res) => {
  res.send('Movie has been deleted from your favorites list successfully.');
});

// ...Task 2.5 ends here

// error handling middleware function using express
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server ERROR occured!');
});

// listen for requests
app.listen(8080, () =>
  console.log('My app is listening on port 8080.'));
//);
