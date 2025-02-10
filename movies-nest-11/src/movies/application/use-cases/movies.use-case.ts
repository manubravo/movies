import { Injectable, Inject } from '@nestjs/common';
import { MoviePortAPI } from '../ports/movie.port';
import { MovieDto } from '../../infrastructure/dtos/movie.dto';

@Injectable()
export class MovieUseCase {
  constructor(
    @Inject('MoviePortAPI') private readonly movieRepository: MoviePortAPI,
  ) {}

  async getPopularMovies(page: number): Promise<{ movies: MovieDto[]; totalPages: number }> {
    return this.movieRepository.getPopularMovies(page);
  }
  
  async getNowPlayingMovies(page: number): Promise<{ movies: MovieDto[]; totalPages: number }> {
    return this.movieRepository.getNowPlayingMovies(page);
  }

  async getMovieCredits(movieId: number) {
    return this.movieRepository.getMovieCredits(movieId);
  }
}