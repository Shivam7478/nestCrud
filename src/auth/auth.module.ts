import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {UsersModule} from '../users/users.module'
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './auth.constants';
@Module({
  imports:[UsersModule,JwtModule.register({
    secret:jwtConstants.secret,
    signOptions: { expiresIn: '60s' },
  }),],
  providers: [AuthService,LocalStrategy],
  controllers: [AuthController],
  exports:[AuthService]
})
export class AuthModule {}
