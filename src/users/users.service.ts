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
  async createNewUser(data :any
  ) {
    let user;
    try {
      user = await this.userModel.find({ email: data.email });

      if (user && user.length) {
        throw new NotFoundException('User already exists');
      }
      if (data.password != data.cpassword) {
        throw new BadRequestException(
          'password & confirm password should match',
        );
      }
      const newUser = new this.userModel(
        data.firstName,
        data.lastName,
       data. dob,
        data.email,
        data.password,
        data.phone,
      );
      newUser.save();
      return newUser;
    } catch (error) {
      throw new ConflictException('Error', error.message);
    }
  }
}
