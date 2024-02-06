import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { AddReserveDto } from './dto/addReserve.dto';
import { GetReserveByDate } from './dto/getReserveByDate.dto';
import { GetREserveByUser } from './dto/getReserveByUser.dto';
import { Reserve } from './entities/reserve.entity';
import { ReserveService } from './reserve.service';

@Controller('reserve')
@ApiTags('예약 API')
export class ReserveController {
  constructor(private readonly reserveService: ReserveService) {}

  @Post()
  @ApiOperation({ summary: '좌석 예약' })
  @ApiCreatedResponse({ type: Reserve })
  async addReserve(@Body() addReserveDto: AddReserveDto) {
    return this.reserveService.addReserve(addReserveDto);
  }

  @Get()
  @ApiOperation({ summary: '날짜 기준 좌석 예약 조회' })
  @ApiCreatedResponse({ type: Reserve, isArray: true })
  async getReserveByDate(
    @Query() getReserveByDate: GetReserveByDate,
  ) {
    return this.reserveService.getReserveByDate(getReserveByDate);
  }

  @Get('/user/:user')
  @ApiOperation({ summary: '유저 기준 좌석 예약 조회' })
  @ApiCreatedResponse({ type: Reserve, isArray: true })
  async getReserveByUser(
    @Query() getReserveByUser: GetREserveByUser,
  ) {
    return this.reserveService.findReserveByUser(
      getReserveByUser.user,
    );
  }
}
