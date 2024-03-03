import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Res,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { ObjectStorageService } from '../object-storage/object-storage.service';
import { GetImageRequestDto } from './dto/request/getImageRequest.dto';

@ApiTags('이미지 API')
@Controller('/api/image')
export class ImageController {
  constructor(
    private readonly objectStorageService: ObjectStorageService,
  ) {}

  @Get('/:id')
  async getImage(
    @Res() response: Response,
    @Param() getImageRequestDto: GetImageRequestDto,
  ) {
    const data = await this.objectStorageService.getObjectUrlById(
      getImageRequestDto.id,
      60 * 10,
    );

    return response.redirect(data);
  }

  // @Post()
  // @UseInterceptors(FileInterceptor('file'))
  // @ApiOperation({ summary: '이미지 업로드' })
  // @ApiCreatedResponse({ type: ObjectMeta })
  // async uploadImage(
  //   @UploadedFile(
  //     new ParseFilePipe({
  //       validators: [new FileTypeValidator({ fileType: 'image' })],
  //     }),
  //   )
  //   file: Express.Multer.File,
  // ) {
  //   const filePath = [
  //     'seats',
  //     `${Date.now()}-${file.originalname}`,
  //   ].join('/');

  //   const objectMeta = await this.objectStorageService.save(
  //     Readable.from(file.buffer),
  //     filePath,
  //     'image',
  //     true,
  //   );

  //   return objectMeta;
  // }
}
