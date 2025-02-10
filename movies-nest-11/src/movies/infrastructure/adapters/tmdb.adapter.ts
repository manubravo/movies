import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { MovieDto } from '../dtos/movie.dto';
import { CastMemberDto } from '../dtos/cast-member.dto';
import { MoviePortAPI } from '../../application/ports/movie.port';

@Injectable()
export class TmdbAdapter implements MoviePortAPI {
  private readonly apiKey: string;
  private readonly baseUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService
  ) {
    this.apiKey = this.getConfigOrThrow('TMDB_API_KEY');
    this.baseUrl = this.getConfigOrThrow('TMDB_API_URL');
  }

  private getConfigOrThrow(key: string): string {
    const value = this.configService.get<string>(key);
    if (!value) throw new Error(`${key} is not defined in the configuration`);
    return value;
  }

  private buildUrl(endpoint: string): string {
    return `${this.baseUrl}${endpoint}?language=es-ES&api_key=${this.apiKey}`;
  }

  async getPopularMovies(page: number = 1): Promise<{ movies: MovieDto[], totalPages: number }> {
    const url = `${this.baseUrl}/movie/popular?language=es-ES&page=${page}&api_key=${this.apiKey}`;
    const { data } = await firstValueFrom(this.httpService.get(url));
  
    return {
      movies: data.results.map(movie => new MovieDto(movie)),
      totalPages: data.total_pages,
    };
  }
  
  async getNowPlayingMovies(page: number = 1): Promise<{ movies: MovieDto[], totalPages: number }> {
    const url = `${this.baseUrl}/movie/now_playing?language=es-ES&page=${page}&api_key=${this.apiKey}`;
    const { data } = await firstValueFrom(this.httpService.get(url));
  
    return {
      movies: data.results.map(movie => new MovieDto(movie)),
      totalPages: data.total_pages,
    };
  }

  async getMovieCredits(movieId: number): Promise<CastMemberDto[]> {
    const { data } = await firstValueFrom(this.httpService.get(this.buildUrl(`/movie/${movieId}/credits`)));
    return data.cast.slice(0, 10).map(actor => new CastMemberDto(actor));
  }
}