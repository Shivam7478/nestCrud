import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
@Module({
  imports: [ProductsModule,MongooseModule.forRoot('mongodb+srv://admin:admin@reactlogin-roglq.mongodb.net/test?retryWrites=true&w=majority'), AuthModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
