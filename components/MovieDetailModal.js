import { API_KEY, BASE_URL, IMAGE_BASE } from '../api.js';

export async function showMovieModal(movieId) {
  const response = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=ko-KR`);
  const movie = await response.json();

  const modal = document.createElement('div');
  modal.classList.add('modal');
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close-button">&times;</span>
      <img src="${IMAGE_BASE + movie.poster_path}" alt="${movie.title}" />
      <h2>${movie.title}</h2>
      <p><strong>평점:</strong> ${movie.vote_average}</p>
      <p><strong>개요:</strong> ${movie.overview}</p>
      <p><strong>개봉일:</strong> ${movie.release_date}</p>
    </div>
  `;
  document.body.appendChild(modal);

  modal.querySelector('.close-button').addEventListener('click', () => {
    modal.remove();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      modal.remove();
    }
  });
}
