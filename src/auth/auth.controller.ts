import { Controller, Post,Request, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import passport = require('passport');
import { AuthGuard } from '@nestjs/passport';
import { authDTO } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @UseGuards(AuthGuard('local'))    
  @Post('login')
  async loginUser(
    @Request() req
  ) {
    const result = await this.authService.login(req.email);
    return result;
  }

  @Post('signup')
  async signupUser(
    @Body() authDTO:authDTO
  ) {
    const result = await this.authService.signupUser(  authDTO
    );
    return { msg: 'User register successfully', payload: result };
  }
}
