import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonThumbnail } from '@ionic/angular/standalone';
import { MoviesService } from '../../../core/services/movie.service';
import { MovieCreditDto } from '../../../core/dtos/movie-credit.dto';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonList,
    IonItem,
    IonLabel,
    IonThumbnail
  ]
})
export class DetailsPage implements OnInit {

  private route = inject(ActivatedRoute);
  private moviesService = inject(MoviesService);

  movieId!: number;
  cast = signal<MovieCreditDto[]>([]);

  async ngOnInit() {
    
    const movieId = this.route.snapshot.params['id'];
  
    if (!movieId) {
      console.error("ID movie not found.");
      return;
    }
    this.cast.set(await this.moviesService.getMovieCredits(movieId));
  }

}