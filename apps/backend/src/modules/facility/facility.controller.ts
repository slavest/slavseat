import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
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

import { JwtAccesGuard } from '../auth/guard/jwt-access.guard';
import { FacilitySummaryDto } from './dto/facilitySummary.dto';
import { AddFacilityRequestDto } from './dto/request/addFacilityRequest.dto';
import { RemoveFacilityRequestDto } from './dto/request/removeFacilityRequest.dto';
import { UpdateFacilityRequestDto } from './dto/request/updateFacilityRequest.dto';
import { RemoveFacilityResponseDto } from './dto/response/removeFacilityResponse.dto';
import { UpdateFacilityResponseDto } from './dto/response/updateFacilityResponse.dto';
import { Facility } from './entity/facility.entity';
import { FacilityService } from './facility.service';

@ApiTags('시설 API')
@Controller('/api/facility')
export class FacilityController {
  constructor(private readonly facilityService: FacilityService) {}

  @Get()
  @ApiOperation({ summary: '모든 시설 조회' })
  @ApiOkResponse({ type: FacilitySummaryDto, isArray: true })
  async getAllFacility() {
    return this.facilityService.getAllFacility();
  }

  @Post()
  @UseGuards(JwtAccesGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '시설 등록' })
  @ApiCreatedResponse({ type: Facility, isArray: true })
  async addFacility(@Body() addFacilityDto: AddFacilityRequestDto) {
    return this.facilityService.addFacility(addFacilityDto);
  }

  @Put()
  @UseGuards(JwtAccesGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '시설 정보 수정' })
  @ApiOkResponse({ type: UpdateFacilityResponseDto })
  async updateFacility(
    @Body() updateFacilityDto: UpdateFacilityRequestDto,
  ) {
    return this.facilityService.updateFacility(updateFacilityDto);
  }

  @Delete()
  @UseGuards(JwtAccesGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '시설 정보 삭제' })
  @ApiOkResponse({ type: RemoveFacilityResponseDto })
  async removeFacility(
    @Body() removeFacilityDto: RemoveFacilityRequestDto,
  ) {
    return this.facilityService.removeFacility(removeFacilityDto);
  }
}
