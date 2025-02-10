export class MovieDto {
  id: number;
  title: string;
  overview: string;
  posterPath: string | null;
  backdropPath: string | null;
  releaseDate: string;
  voteAverage: number;

  constructor(data: any) {
    this.id = data.id;
    this.title = data.title || data.original_title;
    this.overview = data.overview;
    this.posterPath = data.poster_path ? `https://image.tmdb.org/t/p/w500${data.poster_path}` : null;
    this.backdropPath = data.backdrop_path ? `https://image.tmdb.org/t/p/w500${data.backdrop_path}` : null;
    this.releaseDate = data.release_date;
    this.voteAverage = data.vote_average;
  }
}