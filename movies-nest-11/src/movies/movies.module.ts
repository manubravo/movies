import { Module } from '@nestjs/common';
import { TmdbAdapter } from './infrastructure/adapters/tmdb.adapter';
import { HttpModule } from '@nestjs/axios';
import { MoviesController } from './infrastructure/controllers/movies.controller';
import { MovieUseCase } from './application/use-cases/movies.use-case';

@Module({
  imports: [
    HttpModule,
  ],
  providers: [
    {
      provide: 'MoviePortAPI',
      useClass: TmdbAdapter,
    },
    MovieUseCase,
  ],
  controllers: [
    MoviesController,
  ],
})
export class MoviesModule {}