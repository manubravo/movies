import { MovieResponse } from "./movie-response.dto";

export class MovieDto {
  id: number;
  title: string;
  overview: string;
  posterPath: string;
  backdropPath: string;
  releaseDate: string;
  voteAverage: number;

  constructor(data: MovieResponse) {
    this.id = data.id;
    this.title = data.title;
    this.overview = data.overview;
    this.posterPath = data.posterPath;
    this.backdropPath = data.backdropPath;
    this.releaseDate = data.releaseDate;
    this.voteAverage = data.voteAverage;
  }
}