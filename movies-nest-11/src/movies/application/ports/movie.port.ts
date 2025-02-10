import { MovieDto } from '../../infrastructure/dtos/movie.dto';
import { CastMemberDto } from '../../infrastructure/dtos/cast-member.dto';

export interface MoviePortAPI {
  getPopularMovies(page: number): Promise<{ movies: MovieDto[], totalPages: number }>;
  getNowPlayingMovies(page: number): Promise<{ movies: MovieDto[], totalPages: number }>;
  getMovieCredits(movieId: number): Promise<CastMemberDto[]>;
}