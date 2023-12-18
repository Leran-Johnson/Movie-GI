//Code on lines 3-38 work and allow you to input any movie on line 30 and log to console similar movies

// const request = require('request')
// const APIKEY = '933470c5fbd8b3d12415a9a8866fb030'
// const moveieLookUp = (moviename, callback) => {
//     const url = 'https://api.themoviedb.org/3/search/movie?query=' + moviename + '&api_key=' + APIKEY
//     request({ url, json: true }, (err, body) => {
//         if (err) {
//             callback('Unable to connect', undefined)
//         } else if (body.body.results.length === 0) {
//             callback('Try again', undefined)
//         } else {
//             callback(undefined, {
//                 movieID: body.body.results[0].id
//             })
//         }
//     })
// }
// const movieSimilar = (movieID, callback) => {
//     const url = 'https://api.themoviedb.org/3/movie/' + movieID + '/similar?language=en-US&page=1' + '&api_key=' + APIKEY
//     request({ url, json: true }, (err, body) => {
//         if (err) {
//             callback('Unable to load', undefined)
//         } else {
//             callback(body.body.results)
//         }
//     })
// }

// moveieLookUp('Dream Scenario', (err, result) => {
//     movieSimilar(result.movieID, (error, result) => {
//         if (error) {
//             console.error(error);
//         } else {
//             console.log('Movie Similar Result:', result);
//         }
//     });
// });

//Below is me attempting use of express server

const express = require('express');
const request = require('request');

const app = express();
const port = 3000;

const APIKEY = '933470c5fbd8b3d12415a9a8866fb030';

app.use(express.static('public'));

app.get('/lookup', (req, res) => {
    const movieName = req.query.movieName;

    moveieLookUp(movieName, (err, result) => {
        if (err) {
            res.json('Error in movie lookup');
        } else {
            movieSimilar(result.movieID, (error, result) => {
                if (error) {
                    res.json('Error in fetching similar movies');
                } else {
                    res.json(result);
                }
            });
        }
    });
});

const moveieLookUp = (moviename, callback) => {
    const url = 'https://api.themoviedb.org/3/search/movie?query=' + moviename + '&api_key=' + APIKEY;
    request({ url, json: true }, (err, body) => {
        if (err) {
            callback('Unable to connect');
        } else if (body.body.results.length === 0) {
            callback('Movie not found');
        } else {
            callback(undefined, {
                movieID: body.body.results[0].id
            });
        }
    });
};

const movieSimilar = (movieID, callback) => {
    const url = 'https://api.themoviedb.org/3/movie/' + movieID + '/similar?language=en-US&page=1' + '&api_key=' + APIKEY;
    request({ url, json: true }, (err, body) => {
        if (err) {
            callback('Unable to load similar movies');
        } else {
            callback(undefined, body.body.results);
        }
    });
};

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
