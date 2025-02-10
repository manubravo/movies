export class MovieCreditDto {
  id: number;
  name: string;
  character: string;
  profilePath: string;

  constructor(data: Partial<MovieCreditDto>) {
    this.id = data.id || 0;
    this.name = data.name || 'Desconocido';
    this.character = data.character || 'Sin personaje';
    this.profilePath = data.profilePath 
      ? data.profilePath 
      : 'assets/images/default-profile.png'; // Imagen por defecto si no hay foto
  }
}