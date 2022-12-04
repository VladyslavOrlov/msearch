let moviesList = null;
let inputSearch = null;

const createElement = ({
  type,
  attrs,
  container = null,
  position = 'append',
}) => {
  const el = document.createElement(type);

  Object.keys(attrs).forEach((key) => {
    if (key !== 'innerHTML') el.setAttribute(key, attrs[key]);
    else el.innerHTML = attrs[key];
  });

  if (container && position === 'append') container.append(el);
  if (container && position === 'prepend') container.prepend(el);

  return el;
};

const createStyle = () => {
  const style = document.createElement('style');

  style.innerHTML = `
  * {
  box-sizing: border-box;
 }

body {
  margin: 0;
}

.container {
  padding: 20px;
}

.movies {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}

.movie {
  display: flex;
  align-content: center;
  justify-content: center;
}

.movie__image {
  width: 100%;
}
`;

  document.head.append(style);
};

const createMarkup = () => {
  const container = createElement({
    type: 'div',
    attrs: { class: 'container' },
    container: document.body,
    position: 'prepend',
  });

  createElement({
    type: 'h1',
    attrs: { innerHTML: 'Приложения для поиска фильмов' },
    container,
  });

  // header.innerHTML = 'Приложения для поиска фильмов';
  // container.append(header);

  const searchBox = createElement({
    type: 'div',
    attrs: { class: 'search' },
    container,
  });

  const inputBox = createElement({
    type: 'div',
    attrs: { class: 'search__group search__group--input' },
    container: searchBox,
  });

  const checkBox = createElement({
    type: 'div',
    attrs: { class: 'search__group search__group--checkbox' },
    container: searchBox,
  });

  createElement({
    type: 'label',
    attrs: {
      for: 'search',
      innerHTML: 'Поиск фильмов',
    },
    container: inputBox,
  });

  inputSearch = createElement({
    type: 'input',
    attrs: {
      class: 'search__input',
      id: 'search',
      type: 'search',
      placeholder: 'Начните вводить текст...',
    },
    container: inputBox,
  });

  createElement({
    type: 'input',
    attrs: {
      class: 'search__checkbox',
      id: 'checkbox',
      type: 'checkbox',
    },
    container: checkBox,
  });

  createElement({
    type: 'label',
    attrs: {
      for: 'checkbox',
      innerHTML: 'Добавлять фильмы к уже найденным',
    },
    container: checkBox,
  });

  // <h1>Приложения для поиска фильмов</h1>
  // <div class="search">
  //   <div class="search__group search__group--input">
  //     <label for="">Поиск фильмов</label>
  //     <input id="search" type="search" placeholder="Начните вводить текст...">
  //   </div>

  //   <div class="search__group search__group--checkbox">
  //     <input id="checkbox" type="checkbox" placeholder="">
  //     <label for="">Добавлять фильмы к уже найденным</label>
  //   </div>
  // </div>

  moviesList = createElement({
    type: 'div',
    attrs: { class: 'movies' },
    container,
  });

  console.log(moviesList);
};

const addMovieToList = (movie) => {
  const item = createElement({
    type: 'div',
    attrs: { class: 'movie' },
    container: moviesList,
  });
  createElement({
    type: 'img',
    attrs: {
      class: 'movie__image',
      src: /^(http|https):\/\//i.test(movie.Poster)
        ? movie.Poster
        : 'assets/img/no-image.png',
      alt: `${movie.Title}, ${movie.Year}`,
      title: `${movie.Title}, ${movie.Year}`,
    },
    container: item,
  });
};

const getData = (url) =>
  fetch(url)
    .then((response) => response.json())
    .then((json) => json.Search);

const search = 'ironman';

createMarkup();
createStyle();

getData(`http://www.omdbapi.com/?apikey=18b8609f&s=${search}`)
  .then((movies) => movies.forEach((movie) => addMovieToList(movie)))
  .catch((err) => console.log(err));
