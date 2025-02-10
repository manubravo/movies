import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { MovieUseCase } from '../../application/use-cases/movies.use-case';
import { JwtAuthGuard } from '../../../auth/infrastructure/guards/jwt.guard';

@Controller('movies')
@UseGuards(JwtAuthGuard)
export class MoviesController {
  constructor(private readonly movieUseCase: MovieUseCase) {}

  @Get('/popular')
  getPopularMovies(@Query('page') page: number) {
    return this.movieUseCase.getPopularMovies(Number(page) || 1);
  }
  
  @Get('/now-playing')
  getNowPlayingMovies(@Query('page') page: number) {
    return this.movieUseCase.getNowPlayingMovies(Number(page) || 1);
  }

  @Get(':id/credits')
  getMovieCredits(@Param('id') movieId: number) {
    return this.movieUseCase.getMovieCredits(movieId);
  }
}