document.getElementById('movieForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const movieName = document.getElementById('movieName').value;
    fetchMovieData(movieName);
});

function fetchMovieData(movieName) {
    fetch(`/lookup?movieName=${encodeURIComponent(movieName)}`)
        .then(response => response.json())
        .then(data => {
            displayResults(data);
        })
    // .catch(error => console.error('Error:', error));
}

function displayResults(results) {
    const resultContainer = document.getElementById('resultContainer');
    resultContainer.innerHTML = '';
    if (results.error) {
        resultContainer.textContent = results.error;
    } else {
        const similarMovies = results.map(movie => movie.title);
        const resultText = similarMovies.length > 0
            ? `Similar movies: ${similarMovies.join(', ')}`
            : 'No similar movies found.';

        const resultParagraph = document.createElement('p');
        resultParagraph.textContent = resultText;
        resultContainer.appendChild(resultParagraph);
    }
}