import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { User } from './users.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async authenticateUser(email: string, password: string) {
    try {
      const  user = await this.userModel.find({ email: email });
      
      if (user && user.password === password) {
        const { password, ...result } = user;
        return result;
      }
      return null
    } catch (error) {
      throw new ConflictException('Error', error.message);
    }
  }
  async createNewUser(
    firstName: string,
    lastName: string,
    dob: string,
    phone: string,
    email: string,
    password: string,
    cpassword: string,
  ) {
    let user;
    try {
      user = await this.userModel.find({ email: email });

      if (user && user.length) {
        throw new NotFoundException('User already exists');
      }
      if (password != cpassword) {
        throw new BadRequestException(
          'password & confirm password should match',
        );
      }
      const newUser = new this.userModel({
        firstName,
        lastName,
        dob,
        email,
        password,
        phone,
      });
      newUser.save();
      return newUser;
    } catch (error) {
      throw new ConflictException('Error', error.message);
    }
  }
}
