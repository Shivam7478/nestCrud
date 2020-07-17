import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {UsersModule} from '../users/users.module'
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports:[UsersModule,],
  providers: [AuthService,LocalStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
