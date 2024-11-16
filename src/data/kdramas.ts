export interface KDramaData {
  title: string
  image: string
  year: number
  genres: string[]
}

export const kdramaDatabase: KDramaData[] = [
  {
    title: 'Goblin',
    image: 'https://fakeimg.pl/500x500?text=Photo+Cover&font_size=80',
    year: 2016,
    genres: ['Fantasy', 'Romance', 'Drama'],
  },
  {
    title: 'Descendants of the Sun',
    image: 'https://fakeimg.pl/500x500?text=Photo+Cover&font_size=80',
    year: 2016,
    genres: ['Romance', 'Drama', 'Action'],
  },
  {
    title: 'Crash Landing on You',
    image: 'https://fakeimg.pl/500x500?text=Photo+Cover&font_size=80',
    year: 2019,
    genres: ['Romance', 'Drama', 'Comedy'],
  },
  {
    title: "It's Okay to Not Be Okay",
    image: 'https://fakeimg.pl/500x500?text=Photo+Cover&font_size=80',
    year: 2020,
    genres: ['Romance', 'Drama', 'Psychological'],
  },
  {
    title: 'Reply 1988',
    image: 'https://fakeimg.pl/500x500?text=Photo+Cover&font_size=80',
    year: 2015,
    genres: ['Coming of Age', 'Family', 'Romance'],
  },
  {
    title: 'Hospital Playlist',
    image: 'https://fakeimg.pl/500x500?text=Photo+Cover&font_size=80',
    year: 2020,
    genres: ['Medical', 'Drama', 'Friendship'],
  },
  {
    title: 'Mr. Sunshine',
    image: 'https://fakeimg.pl/500x500?text=Photo+Cover&font_size=80',
    year: 2018,
    genres: ['Historical', 'Romance', 'Drama'],
  },
  {
    title: 'Signal',
    image: 'https://fakeimg.pl/500x500?text=Photo+Cover&font_size=80',
    year: 2016,
    genres: ['Crime', 'Thriller', 'Mystery'],
  },
]
