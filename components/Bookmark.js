export let currentMovies = [];

export function setCurrentMovies(movies) {
  currentMovies = movies;
}

export function getBookmarks() {
  return JSON.parse(localStorage.getItem('bookmarkedMovies') || '[]');
}

export function isBookmarked(id) {
  return getBookmarks().includes(id);
}

export function toggleBookmark(id) {
  const bookmarks = getBookmarks();
  const index = bookmarks.indexOf(id);
  if (index > -1) {
    bookmarks.splice(index, 1);
  } else {
    bookmarks.push(id);
  }
  localStorage.setItem('bookmarkedMovies', JSON.stringify(bookmarks));
}