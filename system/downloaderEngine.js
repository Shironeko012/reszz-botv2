const ytdlp = require("yt-dlp-exec").create({
  binary: "yt-dlp"
})

const yts = require("yt-search")
const fs = require("fs")
const path = require("path")

const tmp = path.join(process.cwd(), "tmp")

if (!fs.existsSync(tmp)) {
  fs.mkdirSync(tmp, { recursive: true })
}

const MAX_SIZE = 16 * 1024 * 1024
const MAX_DURATION = 900

/* ======================
HELPERS
====================== */

function randomFile(ext) {
  return path.join(tmp, Date.now() + "-" + Math.floor(Math.random() * 9999) + "." + ext)
}

function cleanup(file) {
  setTimeout(() => {
    try {
      if (fs.existsSync(file)) fs.unlinkSync(file)
    } catch {}
  }, 40000)
}

function checkSize(file) {
  if (!fs.existsSync(file)) throw new Error("File tidak ditemukan")

  const stat = fs.statSync(file)

  if (stat.size > MAX_SIZE) {
    fs.unlinkSync(file)
    throw new Error("File terlalu besar untuk WhatsApp")
  }
}

/* ======================
SEARCH YOUTUBE (CACHE)
====================== */

const searchCache = new Map()

async function search(query) {

  if (searchCache.has(query)) return searchCache.get(query)

  const result = await yts(query)

  if (!result.videos.length) {
    throw new Error("Lagu tidak ditemukan")
  }

  const video = result.videos[0]

  const data = {
    title: video.title,
    webpage_url: video.url,
    duration: video.seconds
  }

  searchCache.set(query, data)

  setTimeout(() => searchCache.delete(query), 60000)

  return data
}

/* ======================
GET VIDEO INFO
====================== */

async function getInfo(url) {

  try {

    const info = await ytdlp(url, {
      dumpSingleJson: true,
      noWarnings: true,
      preferFreeFormats: true,
      skipDownload: true
    })

    return {
      title: info.title || "Unknown Title",
      duration: info.duration || 0,
      uploader: info.uploader || "Unknown"
    }

  } catch (err) {

    console.log("YT INFO ERROR:", err)

    throw new Error("Video tidak ditemukan")
  }
}

/* ======================
RETRY SYSTEM
====================== */

async function runWithRetry(fn, retries = 2) {

  try {
    return await fn()
  } catch (err) {

    if (retries <= 0) throw err

    console.log("Retrying yt-dlp...")

    return runWithRetry(fn, retries - 1)
  }
}

/* ======================
DOWNLOAD AUDIO
====================== */

async function audio(url) {

  const file = randomFile("mp3")

  const info = await getInfo(url)

  if (info.duration > MAX_DURATION) {
    throw new Error("Audio terlalu panjang")
  }

  await runWithRetry(async () => {

    await ytdlp(url, {
      extractAudio: true,
      audioFormat: "mp3",
      audioQuality: "128K",
      format: "bestaudio",
      output: file,
      noPlaylist: true,
      quiet: true
    })

  })

  checkSize(file)
  cleanup(file)

  return {
    file,
    title: info.title,
    duration: info.duration
  }
}

/* ======================
DOWNLOAD VIDEO
====================== */

async function video(url) {

  const file = randomFile("mp4")

  const info = await getInfo(url)

  if (info.duration > MAX_DURATION) {
    throw new Error("Video terlalu panjang")
  }

  await runWithRetry(async () => {

    await ytdlp(url, {
      format: "bestvideo[ext=mp4]+bestaudio[ext=m4a]/best",
      mergeOutputFormat: "mp4",
      output: file,
      noPlaylist: true,
      quiet: true
    })

  })

  checkSize(file)
  cleanup(file)

  return {
    file,
    title: info.title,
    duration: info.duration
  }
}

module.exports = {
  search,
  audio,
  video
}
