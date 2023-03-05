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

const songs = [
  "Sober",
  "Lateralus",
  "Vicarious",
  "Jambi",
  "Rosetta Stoned",
  "Parabola",
  "Parabol",
  "The Pot",
  "Right in Two",
  "The Patient",
  "Opiate",
  "Fear Inoculum",
]

function getRandomSong() {
  const randomIndex = Math.floor(Math.random() * songs.length)
  return songs[randomIndex]
}

function splitLyricsIntoSentences(lyrics) {
  // Separa o texto em frases com base em sinais de pontuação
  const sentences = lyrics.split(/(?<=[.!?])/)
  return sentences
}

function getRandomSentence(sentences) {
  // Seleciona uma frase aleatória do array de frases
  const randomIndex = Math.floor(Math.random() * sentences.length)
  return sentences[randomIndex].trim() // Remove espaços em branco extras
}

async function postRandomLyrics() {
  const song = getRandomSong()
  const lyrics = await lyricsFinder(song)
  const sentences = splitLyricsIntoSentences(lyrics)
  let tweet = ""
  while (tweet === "" || tweet.length > 280) {
    tweet = getRandomSentence(sentences)
  }
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
// setInterval(postRandomLyrics, 8 * 60 * 60 * 1000) // Postar a cada 8 horas
