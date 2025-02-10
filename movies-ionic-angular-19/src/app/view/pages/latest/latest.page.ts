import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonThumbnail, IonLabel, IonInfiniteScroll, IonInfiniteScrollContent } from '@ionic/angular/standalone';
import { MoviesService } from '../../../core/services/movie.service';
import { MovieDto } from '../../../core/dtos/movie.dto';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';

@Component({
  selector: 'app-latest',
  templateUrl: './latest.page.html',
  styleUrls: ['./latest.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    MovieCardComponent
  ]
})
export class LatestPage implements OnInit {

  private moviesService = inject(MoviesService);

  movies = signal<MovieDto[]>([]);
  private currentPage = 1; // Pagination control

  async ngOnInit() {
    await this.loadMovies(true);// Load movies on init
  }

  async loadMovies(reset = false) {
    const newMovies = await this.moviesService.getLatestMovies(this.currentPage);
    if (newMovies.length) {
      this.movies.set(reset ? newMovies : [...this.movies(), ...newMovies]);
      this.currentPage++; // 📌 Incrementamos la página solo si hay datos nuevos
    }
  }

  async loadMore(event?: Event) {
    await this.loadMovies();
    event?.target && (event.target as HTMLIonInfiniteScrollElement).complete();
  }
  
}
