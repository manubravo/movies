import { Module } from '@nestjs/common';
import { AuthAdapterRepository } from './infrastructure/adapters/auth.adapter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './domain/user.entity';
import { AuthUseCase } from './application/use-cases/auth.use-case';
import { AuthController } from './infrastructure/controllers/auth.controller';
import { JwtStrategy } from './infrastructure/strategies/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtAuthGuard } from './infrastructure/guards/jwt.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET', 'default_secret'),
        signOptions: { expiresIn: '1h' },
      }),
    }),
  ],
  controllers: [
    AuthController
  ],
  providers: [
    AuthUseCase,
    {
      provide: 'AuthPortRepository',
      useClass: AuthAdapterRepository,
    },
    JwtStrategy,
    JwtAuthGuard
  ],
  exports: [
    JwtModule,
    JwtAuthGuard
  ]
})
export class AuthModule {}