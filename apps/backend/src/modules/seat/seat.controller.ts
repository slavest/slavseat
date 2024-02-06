import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { AddSeatDto } from './dto/addSeat.dto';
import { RemoveSeatDto } from './dto/removeSeat.dto';
import { Seat } from './entities/seat.entity';
import { SeatService } from './seat.service';

@Controller('seat')
@ApiTags('좌석 API')
export class SeatController {
  constructor(private readonly seatService: SeatService) {}

  @Post()
  @ApiOperation({ summary: '좌석 등록' })
  @ApiCreatedResponse({ type: Seat, isArray: true })
  async addSeats(@Body() addSeatDto: AddSeatDto) {
    return this.seatService.addSeat(addSeatDto);
  }

  @Get()
  @ApiOperation({ summary: '전체 좌석 조회' })
  @ApiCreatedResponse({ type: Seat, isArray: true })
  async getAllSeats() {
    return this.seatService.getAllSeat();
  }

  @Delete('/:id')
  @ApiOperation({ summary: '좌석 삭제' })
  async removeSeat(@Param() removeSeatDto: RemoveSeatDto) {
    return this.seatService.removeSeat(removeSeatDto);
  }
}
