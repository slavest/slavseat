import {
  Body,
  Controller,
  FileTypeValidator,
  ForbiddenException,
  Get,
  Logger,
  NotFoundException,
  Param,
  ParseFilePipe,
  Post,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';

import { AdminGuard } from '../admin/guard/admin.guard';
import { AuthUser } from '../auth/decorator/auth-user.decorator';
import { AuthUserGuard } from '../auth/guard/auth-user.guard';
import { ObjectStorageService } from '../object-storage/object-storage.service';
import { User } from '../user/entity/user.entity';
import { FloorSummaryDto } from './dto/floorSummary.dto';
import { CreateFloorRequestDto } from './dto/request/createFloorRequest.dto';
import { GetFloorByIdRequestDto } from './dto/request/getFloorByIdRequest.dto';
import { GetFloorImageRequestDto } from './dto/request/getFloorImageRequest.dto';
import { UploadFloorImageRequestDto } from './dto/request/uploadFloorImageRequest.dto';
import { Floor } from './entity/floor.entity';
import { FloorService } from './floor.service';

@ApiTags('층 API')
@Controller('/api/floor')
export class FloorController {
  logger = new Logger(FloorController.name);

  constructor(
    private readonly floorService: FloorService,
    private readonly objectStorageService: ObjectStorageService,
  ) {}

  @Get()
  @ApiOperation({ summary: '모든 층 조회' })
  @ApiOkResponse({ type: FloorSummaryDto, isArray: true })
  async getAllFloors() {
    return this.floorService.getAllFloor();
  }

  @Post('/:id/image')
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(AuthUserGuard)
  @UseGuards(AdminGuard)
  @ApiBearerAuth()
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
    return this.floorService.addImageToFloor(uploadFloorImageRequestDto, file);
  }

  @Get('/:id/image')
  @ApiOperation({ summary: '층 사진 조회' })
  async getImage(
    @Res() response: Response,
    @Param() getFloorImageRequestDto: GetFloorImageRequestDto,
  ) {
    console.log(getFloorImageRequestDto);
    const floor = await this.floorService.findById(getFloorImageRequestDto.id);
    if (!floor) throw new NotFoundException(`floor not found`);
    if (!floor.image) throw new NotFoundException(`floor image not found`);

    const data = await this.objectStorageService.getObjectUrlById(floor.image.id, 60 * 10);

    return response.redirect(data);
  }

  @Get('/:id')
  @ApiOperation({ summary: '단일 층 조회' })
  @ApiOkResponse({ type: Floor })
  async getFloorById(@Param() getFloorByidDto: GetFloorByIdRequestDto) {
    return this.floorService.findById(getFloorByidDto.id);
  }

  @Post()
  @UseGuards(AuthUserGuard)
  @UseGuards(AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '층 생성' })
  @ApiCreatedResponse({ type: Floor })
  async createFloor(@AuthUser() user: User, @Body() createFloorRequestDto: CreateFloorRequestDto) {
    return this.floorService.createFloor(createFloorRequestDto);
  }
}
