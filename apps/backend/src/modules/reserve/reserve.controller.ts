import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { AddReserveRequestDto } from './dto/request/addReserveRequest.dto';
import { GetReserveByDateRequestDto } from './dto/request/getReserveByDateRequest.dto';
import { GetReserveByUserRequestDto } from './dto/request/getReserveByUserRequest.dto';
import { RemoveReserveRequestDto } from './dto/request/removeReserveRequest.dto';
import { GetReserveByDateResponseDto } from './dto/response/getReserveByDateResponse.dto';
import { GetReserveByUserResponseDto } from './dto/response/getReserveByUserResponse.dto';
import { RemoveReserveResponseDto } from './dto/response/removeReserveResponse.dto';
import { Reserve } from './entity/reserve.entity';
import { ReserveService } from './reserve.service';

@Controller('reserve')
@ApiTags('예약 API')
export class ReserveController {
  constructor(private readonly reserveService: ReserveService) {}

  @Post()
  @ApiOperation({ summary: '좌석 예약' })
  @ApiCreatedResponse({ type: Reserve })
  async addReserve(
    @Body() addReserveRequestDto: AddReserveRequestDto,
  ) {
    return this.reserveService.addReserve(addReserveRequestDto);
  }

  @Get()
  @ApiOperation({ summary: '날짜 기준 좌석 예약 조회' })
  @ApiOkResponse({
    type: GetReserveByDateResponseDto,
    isArray: true,
  })
  async getReserveByDate(
    @Query() getReserveByDateRequestDto: GetReserveByDateRequestDto,
  ) {
    return this.reserveService.getReserveByDate(
      getReserveByDateRequestDto,
    );
  }

  @Get('/user/:user')
  @ApiOperation({ summary: '유저 기준 좌석 예약 조회' })
  @ApiOkResponse({
    type: GetReserveByUserResponseDto,
    isArray: true,
  })
  async getReserveByUser(
    @Param() getReserveByUserRequestDto: GetReserveByUserRequestDto,
  ) {
    return this.reserveService.findReserveByUser(
      getReserveByUserRequestDto.user,
    );
  }

  @Delete('/:id')
  @ApiOperation({ summary: '예약 취소' })
  @ApiOkResponse({ type: RemoveReserveResponseDto })
  async removeReserve(
    @Param() removeReserveDto: RemoveReserveRequestDto,
  ) {
    return this.reserveService.removeReserve(removeReserveDto);
  }
}
