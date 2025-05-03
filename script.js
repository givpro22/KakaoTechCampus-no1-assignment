const API_KEY = '3a87c97dbcf7872ae5f964054a291849';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';

async function fetchPopularMovies() {
  const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=ko-KR`);
  const data = await response.json();
  console.log(data.results);
  displayMovies(data.results); 
}

fetchPopularMovies();

function displayMovies(movies) {
  const container = document.getElementById('movieContainer');
  container.innerHTML = ''; 

  movies.forEach(movie => {
    const div = document.createElement('div');
    div.classList.add('movie-card');
    div.innerHTML = `
      <img src="${IMAGE_BASE + movie.poster_path}" alt="${movie.title}" />
      <h3>${movie.title}</h3>
      <p>${movie.vote_average}</p>
    `;
    container.appendChild(div);
  });
}

document.getElementById('searchButton').addEventListener('click', () => {
  const query = document.getElementById('searchInput').value.trim();
  if (query) {
    searchMovies(query);
  } else {
    fetchPopularMovies();
  }
});

async function searchMovies(query) {
  const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&language=ko-KR&query=${encodeURIComponent(query)}`);
  const data = await response.json();
  displayMovies(data.results);
}