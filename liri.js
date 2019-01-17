//require keys
const fs = require('fs');
var keys = require('./keys.js');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');

//Get Twitter tweets
var getMyTweets = function () {
    //keep keys private
    var client = new Twitter(keys.twitterKeys);
    //gather the tweets from twitter to filter on
    var params = { screen_name: 'StraightGarrett' };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            // console.log(tweets);
            for (var i = 0; i < tweets.length; i++) {
                console.log(tweets[i].created_at);
                console.log(' ');
                console.log(tweets[i].text);
            }
        }
    });
}

//Get Spotify Song Info
var spotify = new Spotify({
    id: 'c30fcf062e184c0aa80e56ff96dc1edb',
    secret: 'a9bddae30e6d4d8da677e001526f8048',
});

var getArtistNames = function (artist) {
    return artist.name;
}

var getMeSpotify = function (songName) {

    spotify.search({ type: 'track', query: songName }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        var songs = data.tracks.items;
        for (var i = 0; i < songs.length; i++) {
            console.log(i);
            console.log('artist(s): ' + songs[i].artists.map(getArtistNames));
            console.log('song name: ' + songs[i].name);
            console.log('preview song: ' + songs[i].preview_url);
            console.log('album:' + songs[i].album.name);
            console.log('-------------------------------------------');
        }
    });
}
//Get Movie Data
var getMeMovie = function (movieName) {

    request('http://www.omdbapi.com/?i=tt3896198&apikey=a553e714&t=' + movieName + ' &y=&plot=short&r=json', function (error, response, body) {
        if (!error && response.statusCode == 200) {

            var jsonData = JSON.parse(body);
            console.log('Title: ' + jsonData.Title);
            console.log('Year: ' + jsonData.Year);
            console.log('Rated: ' + jsonData.Rated);
            console.log('IMDb Rating: ' + jsonData.imdbRating);
            console.log('Country: ' + jsonData.Country);
            console.log('Language: ' + jsonData.Language);
            console.log('Plot: ' + jsonData.Plot);
            console.log('Actors: ' + jsonData.Actors);
            console.log('Rotten tomatoes rating: ' + jsonData.imdbRating);
            console.log('Rotten tomatoes URL: ' + jsonData.tomatoURL);
        }
    });
}
// var doWhatItSays = function(){
//     fs.readFile('random.txt', function(err, data) {
//     if (err) throw err;
// var dataArr;
//     if (dataArr.length==2){
//         pick(dataArr[0], dataArr[1]);
//     } else if (dataArr.length==1){
//         pick(dataArr[0]);
//     }
//   });
// }
//Display data for above requests
var pick = function (caseData, functionData) {
    switch (caseData) {
        case 'my-tweets':
            getMyTweets();
            break;
        case 'spotify-this-song':
            getMeSpotify(functionData);
            break;
        case 'movie-this':
            getMeMovie(functionData);
            break;
        // case 'do-what-it-says':
        //     doWhatItSays();
        //     break;
        default:
            console.log('LIRI does not know that');

    }
}
var runThis = function (argOne, argTwo) {
    pick(argOne, argTwo);
};

runThis(process.argv[2], process.argv[3]);