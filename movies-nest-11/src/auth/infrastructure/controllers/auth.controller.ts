import { Controller, Post, Body, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthUseCase } from '../../application/use-cases/auth.use-case';
import { LoginDto } from '../dtos/login.dto';
import { CreateUserDto } from '../dtos/create-user.dto';

@Controller('auth')
export class AuthController {

  constructor(
    private readonly authUseCase: AuthUseCase
  ) {}

  @Get()
  async getAll() {
    console.log('docker working??');
    return 'auth active with reload??';
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const user = await this.authUseCase.register(createUserDto);
    return {
      message: 'User registered successfully',
      user: { id: user.id, email: user.email },
    };
  }

  @Post('login')
  @HttpCode(HttpStatus.OK) // 201 for default, 200 for this case
  async login(@Body() loginDto: LoginDto) {
    const token = await this.authUseCase.login(loginDto);
    // return {
    //   message: 'Login successful',
    //   token,
    // };
    return token;
  }
  
}