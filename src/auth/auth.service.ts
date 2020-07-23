import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(private usersService: UsersService,
    private jwtService: JwtService) {}

  async authenticateUser(
    email: string,
    password: string
  ) {
      
    let result = await this.usersService.authenticateUser( email,
      password)

    return result;
  }
  async login(user: any) {
    const payload = { username: user.email, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signupUser(data) {
    let result = await this.usersService.createNewUser(data);

    return result;
  }
}
