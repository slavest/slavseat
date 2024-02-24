import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { FacilitySummaryDto } from './dto/facilitySummary.dto';
import { AddFacilityRequestDto } from './dto/request/addFacilityRequest.dto';
import { UpdateFacilityRequestDto } from './dto/request/updateFacilityRequest.dto';
import { Facility } from './entity/facility.entity';
import { FacilityService } from './facility.service';

@ApiTags('시설 API')
@Controller('facility')
export class FacilityController {
  constructor(private readonly facilityService: FacilityService) {}

  @Get()
  @ApiOperation({ summary: '모든 시설 조회' })
  @ApiOkResponse({ type: FacilitySummaryDto, isArray: true })
  async getAllFacility() {
    return this.facilityService.getAllFacility();
  }

  @Post()
  @ApiOperation({ summary: '시설 등록' })
  @ApiCreatedResponse({ type: Facility, isArray: true })
  async addFacility(@Body() addFacilityDto: AddFacilityRequestDto) {
    return this.facilityService.addFacility(addFacilityDto);
  }

  @Put()
  @ApiOperation({ summary: '시설 정보 수정' })
  @ApiOkResponse({ type: Facility })
  async updateFacility(
    @Body() updateFacilityDto: UpdateFacilityRequestDto,
  ) {
    return this.facilityService.updateFacility(updateFacilityDto);
  }
}
