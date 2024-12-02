import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  // Example users (replace with database in a real app)
  private users = [
    { username: 'validUser', password: 'validPassword' }, // Example user
  ];

  // Verify the user credentials
  async validateUser(username: string, password: string): Promise<any> {
    const user = this.users.find(u => u.username === username && u.password === password);
    if (user) {
      return user; // Return the user if credentials are valid
    }
    return null; // Return null if credentials are invalid
  }
}