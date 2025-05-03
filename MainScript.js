import { fetchPopularMovies, searchMovies, IMAGE_BASE } from './api.js';
import { showMovieModal } from './components/MovieDetailModal.js';
import { isBookmarked, toggleBookmark, setCurrentMovies, currentMovies } from './components/Bookmark.js';

function displayMovies(movies) {
  const container = document.getElementById('movieContainer');
  container.innerHTML = ''; 

  movies.forEach(movie => {
    const div = document.createElement('div');
    div.classList.add('movie-card');
    div.setAttribute('data-movie-id', movie.id);
    div.innerHTML = `
      <img src="${IMAGE_BASE + movie.poster_path}" alt="${movie.title}" />
      <h3>${movie.title}</h3>
      <p>${movie.vote_average}</p>
      <p class="overview">${movie.overview.length > 100 ? movie.overview.slice(0, 100) + '...' : movie.overview}</p>
      <button class="bookmark-btn">${isBookmarked(movie.id) ? '★' : '☆'}</button>`;
    container.appendChild(div);
  });
}

async function init() {
  const movies = await fetchPopularMovies();
  setCurrentMovies(movies);
  displayMovies(movies);
}
init();

document.getElementById('movieContainer').addEventListener('click', (e) => {
  const card = e.target.closest('.movie-card');
  if (!card) return;

  const movieId = parseInt(card.getAttribute('data-movie-id'));

  if (e.target.classList.contains('bookmark-btn')) {
    toggleBookmark(movieId);
    e.target.textContent = isBookmarked(movieId) ? '★' : '☆';
    return; 
  }

  if (movieId) showMovieModal(movieId);
});

document.getElementById('searchButton').addEventListener('click', async () => {
  const { getBookmarks } = await import('./components/Bookmark.js');
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

document.getElementById('bookmarkFilterButton').addEventListener('click', async () => {
  const { getBookmarks } = await import('./components/Bookmark.js');
  const bookmarks = getBookmarks();
  const filtered = currentMovies.filter(movie => bookmarks.includes(movie.id));
  displayMovies(filtered);
});