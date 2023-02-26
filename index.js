const Twit = require("twit")
const genius = require("genius-lyrics-api")
const config = require("./config.js")

// To run project locally
process.env = config

const client = new Twit({
  consumer_key: process.env.consumer_key,
  consumer_secret: process.env.consumer_secret,
  access_token: process.env.access_token,
  access_token_secret: process.env.access_token_secret,
})

// Configure the Genius client
const options = {
  apiKey: process.env.genius_access_token,
  title: "",
  artist: "Tool",
  optimizeQuery: true,
}

// List of lyrics for the artist's songs
let songLyrics = []

// Function to get the lyrics of the artist's songs
async function getSongLyrics() {
  try {
    const searchResults = await genius.search(options)
    const songs = searchResults.map((result) => result.id)
    const lyrics = await genius.getLyrics(songs, options)
    songLyrics = lyrics
    console.log(songLyrics)
  } catch (error) {
    console.error(error)
  }
}

// Function to randomly select a song lyric and post it on Twitter
function postSongLyric() {
  const songLyric = songLyrics[Math.floor(Math.random() * songLyrics.length)]

  console.log(songLyric)

  client.post(
    "statuses/update",
    { status: songLyric },
    function (error, tweet, response) {
      if (!error) {
        console.log(tweet)
      } else {
        console.error(error)
      }
    }
  )
}

getSongLyrics()

// Call the functions at regular intervals
// setInterval(getSongLyrics, 24 * 60 * 60 * 1000); // Get the lyrics of the songs once a day
// setInterval(postSongLyric, 2 * 60 * 60 * 1000); // Post a song lyric every two hours
