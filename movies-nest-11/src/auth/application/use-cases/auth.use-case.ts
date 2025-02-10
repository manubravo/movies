import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Auth, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../domain/user.entity';
import { CreateUserDto } from '../../infrastructure/dtos/create-user.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from '../../infrastructure/dtos/login.dto';
import { ConfigService } from '@nestjs/config';
import { AuthPortRepository } from 'src/auth/application/ports/auth.port';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthUseCase {
  constructor(
    @Inject('AuthPortRepository')
    private readonly authRepository: AuthPortRepository,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<User> {
    
    const { email, password, firstName, lastName, birthDate } = createUserDto;

    const existingUser = await this.authRepository.findByEmail(email);
    if (existingUser) {
      throw new Error('El usuario ya existe.');
    }

    const newUser = new User(email, password, firstName, lastName, birthDate);
    return this.authRepository.save(newUser);
  }

  async login(loginDto: LoginDto): Promise<{ token: string }> {
    const { email, password } = loginDto;

    const user = await this.authRepository.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Email incorrecto.');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Password incorrecto.');
    }

    const jwtSecret = this.configService.get<string>('JWT_SECRET', 'default_secret');

    const token = this.jwtService.sign(
      { 
        userId: user.id,
        email: user.email 
      },
      { 
        secret: this.configService.get<string>('JWT_SECRET', 'default_secret'), expiresIn: '1h' 
      }
    );

    return { token };
  }
}