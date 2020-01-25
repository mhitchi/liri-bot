require("dotenv").config();

//DEPENDENCIES
const axios = require("axios");
const dotenv = require("dotenv");
const fs = require("fs");
const inquirer = require("inquirer");
const moment = require("moment");
const keys = require("./keys.js");
const spotifyAPI = require("node-spotify-api");
const spotify = new spotifyAPI(keys.spotify);

//global vars
let searchType;
let searchInput;

//inquirer
inquirer.prompt([
  {
    //search parameters
    type: "list",
    message: "What are you looking for?",
    name: "searchType",
    choices: ["song", "concert", "movie", "other"]
  },
  {
    //input
    type: "input",
    message: "Type it in here.",
    name: "searchInput"
  }
]).then((response) => {
  console.log(response);
  searchType = response.searchType;
  searchInput = response.searchInput;
  //TODO NOT WORKING
  searchInput.replace(/\s/g, "").toLowerCase();
  console.log(searchInput);
}).then(() => {
  //switch
  switch(searchType) {
    case "song":
      //if no song provided, default to "The Sign" by Ace of Base
      if( searchInput !== "" ){
      getMusic(searchInput);
      } else {
        searchInput = "The Sign";
        getMusic(searchInput);
      };
      break;
    case "concert":
      getConcert(searchInput);
      break;
    case "movie":
      //if no movie provided, default to "Mr. Nobody"
      if( searchInput !== "" ){
        getMovie(searchInput);
      } else {
        searchInput = "Mr Nobody";
        getMovie(searchInput);
      }
      break;
    case "other":
      getRandom(searchInput);
      break;
    default:
      console.log("pick one, dingus");
  }
});

//spotify function
    //render artist, song name, preview link, album
    //use node-spotify-api
const getMusic = (str) => {
  //console.log("getting music");
  spotify
    .search({ type: 'track', query: str , limit: 1})
    .then( function(response) {
      console.log(`Song: ${str}`);
      console.log(`Artist: ${response.tracks.items[0].artists[0].name}`);
      console.log(`Album: ${response.tracks.items[0].album.name}`);
      console.log(`Preview: ${response.tracks.items[0].preview_url}`);
    })
    .catch( function(err) {
      console.log(err);
    });
}

//concert function
  //search Bands in Town Artist Events API for an artist
  //render venue, location, date of event to terminal
const getConcert = (str) => {
  console.log("getting concert");
  axios
    .get(`https://rest.bandsintown.com/artists/${str}/events?app_id=codingbootcamp`)
    .then(function(response) {
      console.log(response.data[0]);
      console.log(`Venue: ${response.data[0].venue.name}`);
      console.log(`Lat: ${response.data[0].venue.latitude}`);
      console.log(`Lon: ${response.data[0].venue.longitude}`);
      console.log(`Date: ${response.data[0].datetime}`);

    })
    .catch(function(error) {
      console.log(error);
    }); 
}

//movie function
  //render title, year, IMDB rating, Rotten Tomatoes rating, country, language, plot, actors
const getMovie = (str) => {
  console.log("getting movie");
  let apikey = "cb792c15";
  axios
    .get(`http://www.omdbapi.com/?apikey=${apikey}&t=${str}`)
    .then(function(response) {
      //returning stuff!!!
      console.log(response.data);
      console.log(`Title: ${response.data.Title}`);
      console.log(`Year: ${response.data.Year}`);
      console.log(`IMDB Rating: ${response.data.Ratings[0].Value}`);
      console.log(`Rotten Tomatoes Rating: ${response.data.Ratings[1].Value}`);
      console.log(`Country: ${response.data.Country}`);
      console.log(`Languages: ${response.data.Language}`);
      console.log(`Plot Synopsis: ${response.data.Plot}`);
      console.log(`Cast: ${response.data.Actors}`);
    })
    .catch(function(error) {
      console.log(error);
    }); 
}

//random function
  //use fs package
    //take text from random.txt
    //call spotify-this-song
const getRandom = (str) => {
  console.log("getting random");
  fs.readFile('./random.txt', 'utf8', (err, data) => {
    if (err) throw err;
    let dataArr = data.split(',');
    // searchType = dataArr[0];
    searchInput = dataArr[1];
    getMusic(searchInput);
  });
}




//output data to log.txt by appending