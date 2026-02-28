import { songs } from '../consts/songs'

let currentSongIndex = 0
const audio = new Audio()

let playIconUrl: string
let pauseIconUrl: string

function loadSong(index: number): void {
  const song = songs[index]
  const coverImage = document.getElementById('coverImage') as HTMLImageElement | null
  const songTitle = document.getElementById('songTitle')
  const songAuthor = document.getElementById('songAuthor')
  const totalTimeDisplay = document.getElementById('totalTime')

  if (coverImage) coverImage.src = song.img.src
  if (songTitle) songTitle.textContent = song.title
  if (songAuthor) songAuthor.textContent = song.author

  audio.src = song.src

  audio.addEventListener(
    'loadedmetadata',
    function totalTimeHandler() {
      if (!totalTimeDisplay) return
      const minutes = Math.floor(audio.duration / 60)
      const seconds = Math.floor(audio.duration % 60)
        .toString()
        .padStart(2, '0')
      totalTimeDisplay.textContent = `${minutes}:${seconds}`
      audio.removeEventListener('loadedmetadata', totalTimeHandler)
    },
  )

  if (!audio.paused) {
    audio.play()
  }
}

function setPlayPauseIcon(iconUrl: string, altText: string): void {
  const icon = document.getElementById('playPauseIcon') as HTMLImageElement | null
  if (icon) {
    icon.src = iconUrl
    icon.alt = altText
  }
  const playButton = document.getElementById('playButton')
  if (playButton) playButton.setAttribute('aria-label', altText)
}

function playSong(): void {
  audio.play()
  setPlayPauseIcon(pauseIconUrl, 'Pause')
}

function pauseSong(): void {
  audio.pause()
  setPlayPauseIcon(playIconUrl, 'Play')
}

function playPause(): void {
  if (audio.paused) {
    playSong()
  } else {
    pauseSong()
  }
}

function nextSong(): void {
  currentSongIndex = (currentSongIndex + 1) % songs.length
  loadSong(currentSongIndex)
  playSong()
}

function prevSong(): void {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length
  loadSong(currentSongIndex)
  playSong()
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
    .toString()
    .padStart(2, '0')
  return `${mins}:${secs}`
}

function updateProgressBar(): void {
  const progressFill = document.getElementById('progressFill')
  const currentTimeDisplay = document.getElementById('currentTime')

  if (audio.duration && progressFill && currentTimeDisplay) {
    const percent = (audio.currentTime / audio.duration) * 100
    progressFill.style.width = `${percent}%`
    currentTimeDisplay.textContent = formatTime(audio.currentTime)
  }
}

export function initMusicPlayer(playUrl: string, pauseUrl: string): void {
  playIconUrl = playUrl
  pauseIconUrl = pauseUrl

  document.getElementById('playButton')?.addEventListener('click', playPause)
  document.getElementById('nextButton')?.addEventListener('click', nextSong)
  document.getElementById('prevButton')?.addEventListener('click', prevSong)
  audio.addEventListener('timeupdate', updateProgressBar)

  const progressContainer = document.querySelector<HTMLElement>('.progress-container')
  if (progressContainer) {
    progressContainer.addEventListener('click', (e: MouseEvent) => {
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
  setPlayPauseIcon(playIconUrl, 'Play')
}
