const searchInput = document.getElementById('search-bar');
const searchButton = document.getElementById('searchButton');
const musicResults = document.getElementById('musicResults');
const feedbackMessage = document.getElementById('feedbackMessage');
const clearButton = document.getElementById('clearButton');

const displayLimit = 10;

function searchMusic() {
  const searchTerm = searchInput.value.trim();
  if (searchTerm !== '') {
    feedbackMessage.textContent = 'Loading...';

    const endpoint = `/v1/artists/${artistId}/albums?album_type=album`;
    const API_URL = `https://api.spotify.com${endpoint}`;

    fetch(API_URL)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        displayMusicResults(data);

        feedbackMessage.textContent = '';
      })

      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        feedbackMessage.textContent = 'Failed to fetch data.';
      });
  } else {
    feedbackMessage.textContent = 'Please enter a search term.';
  }
}


function displayMusicResults(results) {
  musicResults.innerHTML = '';
  if (results && results.length > 0) {
    for (let i = 0; i < Math.min(results.length, displayLimit); i++) {
      const result = results[i];
      const musicItem = document.createElement('div');
      musicItem.classList.add('music-item');
      musicItem.innerHTML = `
        <h3>${result.title}</h3>
        <p>Artist: ${result.artist}</p>
        <p>Album: ${result.album}</p>
        <audio controls>
          <source src="${result.audioUrl}" type="audio/mpeg">
          Your browser does not support the audio element.
        </audio>
      `;

      musicResults.appendChild(musicItem);

      musicItem.addEventListener('click', () => {
        const audio = musicItem.querySelector('audio');
        audio.paused ? audio.play() : audio.pause();
      });
    }
  } else {
    feedbackMessage.textContent = 'No results found.';
  }
}


searchButton.addEventListener('click', (event) => {
  event.preventDefault();
  searchMusic();
});

document.getElementById('searchForm').addEventListener('submit', (event) => {
  event.preventDefault();
  searchMusic();
});

