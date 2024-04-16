import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { AuthUser } from '../auth/decorator/auth-user.decorator';
import { AuthUserGuard } from '../auth/guard/auth-user.guard';
import { User } from '../user/entity/user.entity';
import { AddReserveRequestDto } from './dto/request/addReserveRequest.dto';
import { GetReserveByDateRequestDto } from './dto/request/getReserveByDateRequest.dto';
import { RemoveReserveRequestDto } from './dto/request/removeReserveRequest.dto';
import { GetReserveByDateResponseDto } from './dto/response/getReserveByDateResponse.dto';
import { GetReserveByUserResponseDto } from './dto/response/getReserveByUserResponse.dto';
import { RemoveReserveResponseDto } from './dto/response/removeReserveResponse.dto';
import { Reserve } from './entity/reserve.entity';
import { ReserveService } from './reserve.service';

@ApiTags('예약 API')
@Controller('/api/reserve')
export class ReserveController {
  constructor(private readonly reserveService: ReserveService) {}

  @Post()
  @UseGuards(AuthUserGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '좌석 예약' })
  @ApiCreatedResponse({ type: Reserve })
  async addReserve(
    @AuthUser() user: User,
    @Body() addReserveRequestDto: AddReserveRequestDto,
  ) {
    return this.reserveService.addReserve(user, addReserveRequestDto);
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

  @Get('/user')
  @UseGuards(AuthUserGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '유저 기준 좌석 예약 조회' })
  @ApiOkResponse({
    type: GetReserveByUserResponseDto,
    isArray: true,
  })
  async getReserveByUser(@AuthUser() user: User) {
    return this.reserveService.findReserveByUser(user);
  }

  @Delete('/:id')
  @UseGuards(AuthUserGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '예약 취소' })
  @ApiOkResponse({ type: RemoveReserveResponseDto })
  async removeReserve(
    @AuthUser() user: User,
    @Param() removeReserveDto: RemoveReserveRequestDto,
  ) {
    return this.reserveService.removeReserve(user, removeReserveDto);
  }
}
