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
    choices: ["song/artist", "concert", "movie", "other"]
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
}).then(() => {
  //switch
  switch(searchType) {
    case "song/artist":
      getMusic(searchInput);
      break;
    case "concert":
      getConcert(searchInput);
      break;
    case "movie":
      getMovie(searchInput);
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
    //if no song provided, default to "The Sign" by Ace of Base
    //use node-spotify-api
const getMusic = (str) => {
  console.log("getting music");
  axios
    .get(`https://api.spotify.com/v1/search$q=${str}`, {
      headers: {
        "Authorization": "Basic"
      }
    })
    .then(function(response) {
      //TODO throwing error
      console.log(response.data);
    })
    .catch(function(error) {
      console.log(error);
    }); 
}

//concert function
  //search Bands in Town Artist Events API for an artist
    //"https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
    //use "codingbootcamp" as app_id
    //render venue, location, date of event to terminal
const getConcert = (str) => {
  console.log("getting concert");
  axios
    .get(`https://rest.bandsintown.com/artists/${str}/events?app_id=codingbootcamp`)
    .then(function(response) {
      //TODO returning empty array
      console.log(response.data);
    })
    .catch(function(error) {
      console.log(error);
    }); 
}

//movie function
  //use axios
    //use "trilogy" as api key
    //render title, year, IMDB rating, Rotten Tomatoes rating, country, language, plot, actors
    //if no movie provided, default to "Mr. Nobody"
const getMovie = (str) => {
  console.log("getting movie");
  let apikey = "cb792c15";
  axios
    .get(`http://www.omdbapi.com/?apikey=${apikey}&t=${str}`)
    .then(function(response) {
      //returning stuff!!!
      console.log(response.data);
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
  
}




//output data to log.txt by appending