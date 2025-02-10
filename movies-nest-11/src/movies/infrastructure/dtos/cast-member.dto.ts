export class CastMemberDto {
  id: number;
  name: string;
  character: string;
  profilePath: string | null;

  constructor(data: any) {
    this.id = data.id;
    this.name = data.name;
    this.character = data.character;
    this.profilePath = data.profile_path
      ? `https://image.tmdb.org/t/p/w500${data.profile_path}`
      : null;
  }
}