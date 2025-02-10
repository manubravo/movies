import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MovieDto } from '../dtos/movie.dto';
import { MovieResponse } from '../dtos/movie-response.dto';
import { firstValueFrom } from 'rxjs';
import { MovieCreditDto } from '../dtos/movie-credit.dto';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  
  private apiUrl = environment.VITE_BACKEND_URL;
  private http = inject(HttpClient);

  latestMovies = signal<MovieDto[]>([]);
  popularMovies = signal<MovieDto[]>([]);

  async getLatestMovies(page = 1): Promise<MovieDto[]> {
    try {
      const response = await firstValueFrom(
        this.http.get<{ movies: MovieResponse[], totalPages: number }>(
          `${this.apiUrl}/movies/now-playing?page=${page}`
        )
      );
  
      if (!response?.movies?.length) {
        console.warn("No latest movies found.");
        return [];
      }
  
      return response.movies.slice(0, 20).map(movie => new MovieDto(movie));
  
    } catch (error) {
      console.error('Error fetching latest movies:', error);
      return [];
    }
  }

  async getPopularMovies(page = 1): Promise<MovieDto[]> {
    try {
      const response = await firstValueFrom(
        this.http.get<{ movies: MovieResponse[], totalPages: number }>(
          `${this.apiUrl}/movies/popular?page=${page}`
        )
      );
  
      if (!response?.movies?.length) {
        console.warn("No popular movies found.");
        return [];
      }
  
      return response.movies.slice(0, 20).map(movie => new MovieDto(movie));
  
    } catch (error) {
      console.error('Error fetching popular movies:', error);
      return [];
    }
  }

  async getMovieCredits(movieId: number): Promise<MovieCreditDto[]> {

    try {
      const response = await firstValueFrom(
        this.http.get<MovieCreditDto[]>(`${this.apiUrl}/movies/${movieId}/credits`)
      );
  
      if (!response?.length) {
        console.warn("No credits movies found.");
        return [];
      }
      return response;
  
    } catch (error) {
      console.error('Error feching credits movies:', error);
      return [];
    }
  }
  
}
