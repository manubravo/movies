import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieDto } from '../../../core/dtos/movie.dto';
import { Router } from '@angular/router';
import { IonCard, IonCardContent, IonImg, IonCardHeader, IonCardTitle } from '@ionic/angular/standalone';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonImg
  ],
})
export class MovieCardComponent {
  @Input() movie!: MovieDto;

  constructor(private router: Router) {}

  goToDetails() {
    if (!this.movie?.id) return;
    this.router.navigate(['/details', this.movie.id]);
  }
}