import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  HttpStatus,
  Logger,
  NotFoundException,
  Param,
  ParseFilePipe,
  Post,
  Query,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { Readable } from 'stream';

import { ObjectMeta } from '../object-storage/entity/objectMeta.entity';
import { ObjectStorageService } from '../object-storage/object-storage.service';
import { CreateFloorRequestDto } from './dto/request/createFloorRequest.dto';
import { GetFloorByIdDto } from './dto/request/getFloorByIdRequest.dto';
import { GetFloorImageRequestDto } from './dto/request/getFloorImageRequest.dto';
import { UploadFloorImageRequestDto } from './dto/request/uploadFloorImageRequest.dto';
import { GetAllFloorResponseDto } from './dto/response/getAllFloorResponse.dto';
import { Floor } from './entity/floor.entity';
import { FloorService } from './floor.service';

@ApiTags('층 API')
@Controller('floor')
export class FloorController {
  logger = new Logger(FloorController.name);

  constructor(
    private readonly floorService: FloorService,
    private readonly objectStorageService: ObjectStorageService,
  ) {}

  @Get()
  @ApiOperation({ summary: '모든 층 조회' })
  @ApiCreatedResponse({ type: GetAllFloorResponseDto, isArray: true })
  async getAllFloors() {
    return this.floorService.getAllFloor();
  }

  @Get('/:id')
  @ApiOperation({ summary: '단일 층 조회' })
  @ApiCreatedResponse({ type: Floor })
  async getFloorById(@Query() getFloorByidDto: GetFloorByIdDto) {
    return this.floorService.findById(getFloorByidDto.id);
  }

  @Post()
  @ApiOperation({ summary: '층 생성' })
  @ApiCreatedResponse({ type: Floor })
  async createFloor(
    @Body() createFloorRequestDto: CreateFloorRequestDto,
  ) {
    return this.floorService.createFloor(createFloorRequestDto);
  }

  @Post('/image/:floorId')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiOperation({ summary: '층 사진 등록' })
  @ApiCreatedResponse({ type: Floor })
  async uploadFloorImage(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: 'image' })],
      }),
    )
    file: Express.Multer.File,
    @Param() uploadFloorImageRequestDto: UploadFloorImageRequestDto,
  ) {
    this.logger.log('beforeFind', uploadFloorImageRequestDto);
    const floor = await this.floorService.findById(
      uploadFloorImageRequestDto.floorId,
    );
    if (!floor) throw new NotFoundException(`floor is not found`);

    const filePath = [
      'floor',
      `${floor.name}-${floor.id}-${encodeURIComponent(
        file.originalname,
      )}`,
    ].join('/');

    const objectMeta = await this.objectStorageService.save(
      Readable.from(file.buffer),
      filePath,
      file.mimetype,
      true,
    );

    const savedFloor = await this.floorService.addImageToFloor(
      floor.id,
      objectMeta.id,
    );

    return savedFloor;
  }

  @Get('/image/:floorId')
  @ApiOperation({ summary: '층 사진 조회' })
  async getImage(
    @Res() response: Response,
    @Param() getFloorImageRequestDto: GetFloorImageRequestDto,
  ) {
    const floor = await this.floorService.findById(
      getFloorImageRequestDto.floorId,
    );
    if (!floor) throw new NotFoundException(`floor not found`);
    if (!floor.image)
      throw new NotFoundException(`floor image not found`);

    const data = await this.objectStorageService.getObjectUrlById(
      floor.image.id,
      60 * 10,
    );

    return response.redirect(data);
  }
}
