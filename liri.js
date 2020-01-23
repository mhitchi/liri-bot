require("dotenv").config();
var keys = require("./keys.js");

//switch
switch(command) {
  case "concert-this":
    //search Bands in Town Artist Events API for an artist
    //"https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
    //use "codingbootcamp" as app_id
    //render venue, location, date of event to terminal
    break;
  case "spotify-this-song":
    //render artist, song name, preview link, album
    //if no song provided, default to "The Sign" by Ace of Base
    //use node-spotify-api
    break;
  case "movie-this":
    //use axios
    //use "trilogy" as api key
    //render title, year, IMDB rating, Rotten Tomatoes rating, country, language, plot, actors
    //if no movie provided, default to "Mr. Nobody"
    break;
  case "do-what-it-says":
    //use fs package
    //take text from random.txt
    //call spotify-this-song
}

//output data to log.txt by appending