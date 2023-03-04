const Twit = require("twit")
const lyricsFinder = require("lyrics-finder")

const config = require("./config.js")

process.env = config

const client = new Twit({
  consumer_key: process.env.consumer_key,
  consumer_secret: process.env.consumer_secret,
  access_token: process.env.access_token,
  access_token_secret: process.env.access_token_secret,
})

// const Twitter = require("twitter")
// const lyricsFinder = require("lyrics-finder")

const songs = ["Sober", "Lateralus", "Vicarious", "Jambi"]

function getRandomSong() {
  const randomIndex = Math.floor(Math.random() * songs.length)
  return songs[randomIndex]
}

async function postRandomLyrics() {
  const song = getRandomSong()
  const lyrics = await lyricsFinder(song)
  const tweet = `${song}\n\n${lyrics.substr(0, 180 - song.length - 3) + "..."}`
  console.log(`Posting tweet: ${tweet}`)
  client.post(
    "statuses/update",
    { status: tweet },
    function (error, tweet, response) {
      if (error) {
        console.log(`Error posting tweet: ${error}`)
      } else {
        console.log(`Tweet posted successfully!`)
      }
    }
  )
}

postRandomLyrics()

// setInterval(getSongLyrics, 24 * 60 * 60 * 1000)
// setInterval(postSongLyric, 2 * 60 * 60 * 1000) // Postar a cada 2 horas
