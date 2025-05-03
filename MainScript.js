import { fetchPopularMovies, searchMovies, IMAGE_BASE } from './api.js';
import { showMovieModal } from './components/MovieDetailModal.js';

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
      <p class="overview">${movie.overview.length > 100 ? movie.overview.slice(0, 100) + '...' : movie.overview}</p>
    `;
    div.addEventListener('click', () => showMovieModal(movie.id));
    container.appendChild(div);
  });
}

async function init() {
  const movies = await fetchPopularMovies();
  displayMovies(movies);
}
init();

document.getElementById('searchButton').addEventListener('click', async () => {
  const query = document.getElementById('searchInput').value.trim();
  const movies = query ? await searchMovies(query) : await fetchPopularMovies();
  displayMovies(movies);
});

document.getElementById('searchInput').addEventListener('keydown', async (e) => {
  if (e.key === 'Enter') {
    const query = document.getElementById('searchInput').value.trim();
    const movies = query ? await searchMovies(query) : await fetchPopularMovies();
    displayMovies(movies);
  }
});