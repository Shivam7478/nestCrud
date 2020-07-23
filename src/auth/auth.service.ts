import { Injectable, HttpException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';
import { response } from 'express';
@Injectable()
export class AuthService {
  constructor(private usersService: UsersService,
    private jwtService: JwtService,
    private readonly mailerService: MailerService) {}

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
  async forgotPassword(data) {
   
    this
    .mailerService
    .sendMail({
      to: 's9575931125@gmail.com', // list of receivers
      from: 'shivm7478@gmail.com', // sender address
      subject: 'Testing Nest MailerModule ✔', // Subject line
      text: 'welcome', // plaintext body
      html: '<b>welcome</b>', // HTML body content
    })
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((error) => {
      throw new HttpException("Enable to do authenticatio",404)
      console.log(error);
      
    });
    
  }
}
