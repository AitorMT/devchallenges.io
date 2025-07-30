import { songs } from '../consts/songs';

let currentSongIndex = 0;
const audio = new Audio(songs[currentSongIndex].src);

function loadSong(index) {
  const song = songs[index];
  document.getElementById("coverImage").src = song.img.src;
  document.getElementById("songTitle").textContent = song.title;
  document.getElementById("songAuthor").textContent = song.author;
  audio.addEventListener("loadedmetadata", () => {
  const totalTimeDisplay = document.getElementById("totalTime");
  const minutes = Math.floor(audio.duration / 60);
  const seconds = Math.floor(audio.duration % 60).toString().padStart(2, '0');
  totalTimeDisplay.textContent = `${minutes}:${seconds}`;
});
  audio.src = song.src;
  audio.play();
}

function playPause() {
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
}

function nextSong() {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong(currentSongIndex);
}

function prevSong() {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  loadSong(currentSongIndex);
}

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${mins}:${secs}`;
}

function updateProgressBar() {
  const progressFill = document.getElementById("progressFill");
  const currentTimeDisplay = document.getElementById("currentTime");

  if (audio.duration) {
    const percent = (audio.currentTime / audio.duration) * 100;
    progressFill.style.width = `${percent}%`;
    currentTimeDisplay.textContent = formatTime(audio.currentTime);
  }
}

export function initMusicPlayer() {
  document.getElementById("playButton").addEventListener("click", playPause);
  document.getElementById("nextButton").addEventListener("click", nextSong);
  document.getElementById("prevButton").addEventListener("click", prevSong);
  audio.addEventListener("timeupdate", updateProgressBar);

  document.getElementById("progressBar").addEventListener("input", function () {
    audio.currentTime = (this.value / 100) * audio.duration;
    
  });

  loadSong(currentSongIndex);
  console.log("Music player initialized");
}
