import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../domain/user.entity';
import { AuthPortRepository } from '../../application/ports/auth.port';

@Injectable()
export class AuthAdapterRepository implements AuthPortRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  async save(user: User): Promise<User> {
    return this.userRepository.save(user);
  }
}