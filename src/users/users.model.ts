import * as mongoose from 'mongoose';
export const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cpassword: {
    type: String
  }
});

export interface User{
     firstName: string;
     lastName: string;
     email: string;
     dob: string;
     password:string;
     cpassword:string;
     phone: number;

}
