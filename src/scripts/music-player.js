import { songs } from '../consts/songs'

let currentSongIndex = 0
const audio = new Audio()

let playIconUrl
let pauseIconUrl

function loadSong(index) {
  const song = songs[index]
  document.getElementById('coverImage').src = song.img.src
  document.getElementById('songTitle').textContent = song.title
  document.getElementById('songAuthor').textContent = song.author

  audio.src = song.src

  audio.addEventListener('loadedmetadata', function totalTimeHandler() {
    const totalTimeDisplay = document.getElementById('totalTime')
    const minutes = Math.floor(audio.duration / 60)
    const seconds = Math.floor(audio.duration % 60)
      .toString()
      .padStart(2, '0')
    totalTimeDisplay.textContent = `${minutes}:${seconds}`
    audio.removeEventListener('loadedmetadata', totalTimeHandler)
  })

  if (!audio.paused) {
    audio.play()
  }
}

function playSong() {
  audio.play()
  document.getElementById('playPauseIcon').src = pauseIconUrl
  document.getElementById('playPauseIcon').alt = 'Pause'
}

function pauseSong() {
  audio.pause()
  document.getElementById('playPauseIcon').src = playIconUrl
  document.getElementById('playPauseIcon').alt = 'Play'
}

function playPause() {
  if (audio.paused) {
    playSong()
  } else {
    pauseSong()
  }
}

function nextSong() {
  currentSongIndex = (currentSongIndex + 1) % songs.length
  loadSong(currentSongIndex)
  playSong()
}

function prevSong() {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length
  loadSong(currentSongIndex)
  playSong()
}

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
    .toString()
    .padStart(2, '0')
  return `${mins}:${secs}`
}

function updateProgressBar() {
  const progressFill = document.getElementById('progressFill')
  const currentTimeDisplay = document.getElementById('currentTime')

  if (audio.duration) {
    const percent = (audio.currentTime / audio.duration) * 100
    progressFill.style.width = `${percent}%`
    currentTimeDisplay.textContent = formatTime(audio.currentTime)
  }
}

export function initMusicPlayer(playUrl, pauseUrl) {
  playIconUrl = playUrl
  pauseIconUrl = pauseUrl

  document.getElementById('playButton').addEventListener('click', playPause)
  document.getElementById('nextButton').addEventListener('click', nextSong)
  document.getElementById('prevButton').addEventListener('click', prevSong)
  audio.addEventListener('timeupdate', updateProgressBar)

  const progressContainer = document.querySelector('.progress-container')
  if (progressContainer) {
    progressContainer.addEventListener('click', (e) => {
      if (audio.duration) {
        const clickX = e.clientX - progressContainer.getBoundingClientRect().left
        const width = progressContainer.offsetWidth
        audio.currentTime = (clickX / width) * audio.duration
      }
    })
  }

  audio.addEventListener('ended', () => {
    nextSong()
  })

  loadSong(currentSongIndex)

  document.getElementById('playPauseIcon').src = playIconUrl
  document.getElementById('playPauseIcon').alt = 'Play'
}
