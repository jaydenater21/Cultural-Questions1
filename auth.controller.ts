import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async login(@Body() body: { username: string; password: string }) {
    const { username, password } = body;

    // Validate the user credentials
    const user = await this.authService.validateUser(username, password);
    
    if (user) {
      return { message: 'Login successful' };  // Send a success response
    } else {
      return { message: 'Invalid credentials' };  // Send an error message
    }
  }
}