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

const artistName = "Tool"

let songLyrics = []

async function getSongLyrics() {
  try {
    const songs = await lyricsFinder(artistName)

    for (const song of songs) {
      const lyrics = await lyricsFinder(artistName, song)
      songLyrics.push(lyrics)
    }

    console.log(songLyrics)
  } catch (error) {
    console.error(error)
  }
}

function postSongLyric() {
  const songLyric = songLyrics[Math.trunc(Math.random() * songLyrics.length)]
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

// getSongLyrics()
// postSongLyric()
setInterval(getSongLyrics, 24 * 60 * 60 * 1000)
setInterval(postSongLyric, 2 * 60 * 60 * 1000) // Postar a cada 2 horas
