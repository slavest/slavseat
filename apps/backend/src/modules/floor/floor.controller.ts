import { Controller, Get, Query } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { GetFloorByIdDto } from './dto/request/getFloorByIdRequest.dto';
import { GetAllFloorResponseDto } from './dto/response/getAllFloorResponse.dto';
import { Floor } from './entity/floor.entity';
import { FloorService } from './floor.service';

@ApiTags('층 API')
@Controller('floor')
export class FloorController {
  constructor(private readonly floorService: FloorService) {}

  @Get()
  @ApiOperation({ summary: '모든 층 조회 API' })
  @ApiCreatedResponse({ type: GetAllFloorResponseDto, isArray: true })
  async getAllFloors() {
    return this.floorService.getAllFloor();
  }

  @Get('/:id')
  @ApiOperation({ summary: '단일 층 조회 API' })
  @ApiCreatedResponse({ type: Floor })
  async getFloorById(@Query() getFloorByidDto: GetFloorByIdDto) {
    return this.floorService.findFloorById(getFloorByidDto.id);
  }
}
