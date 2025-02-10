import { User } from '../../domain/user.entity';

export interface AuthPortRepository {
  findByEmail(email: string): Promise<User | null>;
  save(user: User): Promise<User>;
}