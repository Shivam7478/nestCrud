import { Controller, Post,Request, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import passport = require('passport');
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @UseGuards(AuthGuard('local'))    
  @Post('login')
  async loginUser(
    @Request() req
  ) {
    console.log("ssjnfkjsnfjkdsnfjkskfnskdn");
    
    const result = await this.authService.login(req.email);
    return result;
  }

  @Post('signup')
  async signupUser(
    @Body('firstName') firstName: string,
    @Body('lastName') lastName: string,
    @Body('dob') dob: string,
    @Body('phone') phone: string,
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('cpassword') cpassword: string,
  ) {
    const result = await this.authService.signupUser(
      firstName,
      lastName,
      dob,
      phone,
      email,
      password,
      cpassword,
    );
    return { msg: 'User register successfully', payload: result };
  }
}
