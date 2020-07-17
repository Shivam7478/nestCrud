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

  async signupUser(
    firstName: string,
    lastName: string,
    dob: string,
    phone: string,
    email: string,
    password: string,
    cpassword: string,
  ) {
    let result = await this.usersService.createNewUser(
      firstName,
      lastName,
      dob,
      phone,
      email,
      password,
      cpassword,
    );

    return result;
  }
}
