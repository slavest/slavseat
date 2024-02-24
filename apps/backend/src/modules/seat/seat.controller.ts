import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  HttpStatus,
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
import { Readable } from 'stream';

import { ObjectMeta } from '../object-storage/entity/objectMeta.entity';
import { ObjectStorageService } from '../object-storage/object-storage.service';
import { AddSeatRequestDto } from './dto/request/addSeatRequest.dto';
import { GetSeatByFloorRequestDto } from './dto/request/getSeatByFloorRequest.dto';
import { RemoveSeatRequestDto } from './dto/request/removeSeatRequest.dto';
import { Seat } from './entity/seat.entity';
import { SeatService } from './seat.service';

@Controller('seat')
@ApiTags('좌석 API')
export class SeatController {
  constructor(
    private readonly seatService: SeatService,
    private readonly objectStorageService: ObjectStorageService,
  ) {}

  // @Get('/image')
  // @ApiOperation({ summary: '좌석 이미지 조회' })
  // @ApiCreatedResponse({ status: HttpStatus.TEMPORARY_REDIRECT })
  // async getSeatImage(@Res() response: Response) {
  //   const filePath = ['seats', 'seat-image'].join('/');

  //   const objectMeta =
  //     await this.objectStorageService.findObjectMetaById(filePath);
  //   if (!objectMeta)
  //     throw new NotFoundException(
  //       '요청한 이미지는 존재하지 않습니다',
  //     );

  //   const data = await this.objectStorageService.getObjectUrl(
  //     objectMeta.name,
  //     60 * 10,
  //   );

  //   return response.redirect(data);
  // }

  // @Post('/image')
  // @UseInterceptors(FileInterceptor('file'))
  // @ApiOperation({ summary: '좌석 이미지 등록' })
  // @ApiCreatedResponse({ type: ObjectMeta })
  // async uploadSeatImage(
  //   @UploadedFile(
  //     new ParseFilePipe({
  //       validators: [new FileTypeValidator({ fileType: 'image' })],
  //     }),
  //   )
  //   file: Express.Multer.File,
  // ) {
  //   const filePath = ['seats', 'seat-image'].join('/');

  //   const objectMeta = await this.objectStorageService.save(
  //     Readable.from(file.buffer),
  //     filePath,
  //     'image',
  //     true,
  //   );

  //   return objectMeta;
  // }

  @Post()
  @ApiOperation({ summary: '좌석 등록' })
  @ApiCreatedResponse({ type: Seat, isArray: true })
  async addSeats(@Body() addSeatDto: AddSeatRequestDto) {
    return this.seatService.addSeat(addSeatDto);
  }

  @Get()
  @ApiOperation({ summary: '전체 좌석 조회' })
  @ApiCreatedResponse({ type: Seat, isArray: true })
  async getAllSeats() {
    return this.seatService.getAllSeat();
  }

  @Get('/floor/:floorId')
  @ApiOperation({ summary: '층 아이디로 좌석 조회' })
  @ApiCreatedResponse({ type: Seat, isArray: true })
  async getSeatByFloor(
    @Param() getSeatByFloorRequestDto: GetSeatByFloorRequestDto,
  ) {
    return this.seatService.findByFloorId(
      getSeatByFloorRequestDto.floorId,
    );
  }

  @Delete('/:id')
  @ApiOperation({ summary: '좌석 삭제' })
  async removeSeat(@Param() removeSeatDto: RemoveSeatRequestDto) {
    return this.seatService.removeSeat(removeSeatDto);
  }
}
