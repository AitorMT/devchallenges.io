import LostInTheCityLights from '@/assets/music-player/images/cover-1.webp'
import ForestLullaby from '@/assets/music-player/images/cover-2.webp'
import LostInTheCityLightsSong from '@/assets/music-player/songs/lost-in-city-lights.mp3'
import ForestLullabySong from '@/assets/music-player/songs/forest-lullaby.mp3'

export interface Song {
  title: string
  author: string
  src: string
  img: ImageMetadata
}

export const songs: Song[] = [
  {
    title: 'Lost in the City Lights',
    author: 'Cosmo Sheldrake',
    src: LostInTheCityLightsSong,
    img: LostInTheCityLights,
  },
  {
    title: 'Forest Lullaby',
    author: 'Lesfm',
    src: ForestLullabySong,
    img: ForestLullaby,
  },
]
