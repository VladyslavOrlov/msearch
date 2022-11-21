let moviesList = null;

const createMarkup = () => {
  const container = document.createElement('div');
  const movies = document.createElement('div');

  container.setAttribute('class', 'container');
  movies.setAttribute('class', 'movies');

  container.append(movies);
  document.body.prepend(container);

  moviesList = document.querySelector('.movies');
};

const addMovieToList = (movie) => {
  const item = document.createElement('div');
  const img = document.createElement('img');

  item.setAttribute('class', 'movie');
  img.setAttribute('class', 'movie__image');

  if (/^(http|https):\/\//i.test(movie.Poster)) {
    img.src = movie.Poster;
  } else {
    img.src = 'assets/img/no-image.png';
  }

  img.alt = `${movie.Title}, ${movie.Year}`;
  img.title = `${movie.Title}, ${movie.Year}`;

  item.append(img);
  moviesList.append(item);
};

const getData = (url) =>
  fetch(url)
    .then((response) => response.json())
    .then((json) => json.Search);

const search = 'ironman';

createMarkup();

getData(`http://www.omdbapi.com/?apikey=18b8609f&s=${search}`)
  .then((movies) => movies.forEach((movie) => addMovieToList(movie)))
  .catch((err) => console.log(err));
