import {
  Controller,
  FileTypeValidator,
  Get,
  NotFoundException,
  Param,
  ParseFilePipe,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { Readable } from 'stream';

import { ObjectMeta } from '../object-storage/entity/objectMeta.entity';
import { ObjectStorageService } from '../object-storage/object-storage.service';
import { GetImageParamDto } from './dto/getImage.dto';

@ApiTags('이미지 API')
@Controller('/api/image')
export class ImageController {
  constructor(
    private readonly objectStorageService: ObjectStorageService,
  ) {}

  @Get('/:thumbnailId')
  async getImage(
    @Res() response: Response,
    @Param() getImageParamDto: GetImageParamDto,
  ) {
    const objectMeta =
      await this.objectStorageService.findObjectMetaById(
        getImageParamDto.imageId,
      );
    if (!objectMeta)
      throw new NotFoundException(
        '요청한 이미지는 존재하지 않습니다',
      );

    const data = await this.objectStorageService.getObjectUrl(
      objectMeta.name,
      60 * 10,
    );

    return response.redirect(data);
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: '이미지 업로드' })
  @ApiCreatedResponse({ type: ObjectMeta })
  async uploadImage(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: 'image' })],
      }),
    )
    file: Express.Multer.File,
  ) {
    const filePath = [
      'seats',
      `${Date.now()}-${file.originalname}`,
    ].join('/');

    const objectMeta = await this.objectStorageService.save(
      Readable.from(file.buffer),
      filePath,
      'image',
      true,
    );

    return objectMeta;
  }
}
