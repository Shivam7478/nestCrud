import { Controller, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { editFileName, imageFileFilter } from 'src/utils/file-uploading.utils';
import {diskStorage} from 'multer';
@Controller('users')
export class UsersController {
    constructor() {}
   
    @Post('uploadImage')
    @UseInterceptors(
        FileInterceptor('profileImage',
        {
            storage: diskStorage({
              destination: './files',
              filename: editFileName,
            }),
            fileFilter: imageFileFilter,
          })
      )
    async uploadImage(@UploadedFile() file
    ) {
        const response = {
            originalname: file.originalname,
            filename: file.filename,
          };
      return response;
    }
}
