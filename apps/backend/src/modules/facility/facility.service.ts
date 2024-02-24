import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { FloorService } from '../floor/floor.service';
import { FacilitySummaryDto } from './dto/facilitySummary.dto';
import { AddFacilityRequestDto } from './dto/request/addFacilityRequest.dto';
import { RemoveFacilityRequestDto } from './dto/request/removeFacilityRequest.dto';
import { UpdateFacilityRequestDto } from './dto/request/updateFacilityRequest.dto';
import { RemoveFacilityResponseDto } from './dto/response/removeFacilityResponse.dto';
import { UpdateFacilityResponseDto } from './dto/response/updateFacilityResponse.dto';
import { Facility } from './entity/facility.entity';

@Injectable()
export class FacilityService {
  constructor(
    @InjectRepository(Facility)
    private readonly facilityRepository: Repository<Facility>,
    private readonly floorService: FloorService,
  ) {}

  async getAllFacility(): Promise<FacilitySummaryDto[]> {
    return this.facilityRepository.find();
  }

  async addFacility(addFacilityDto: AddFacilityRequestDto) {
    const saved: Facility[] = [];

    const floor = await this.floorService.findById(
      addFacilityDto.floorId,
    );
    if (!floor) throw new NotFoundException('floor not found');

    for (const facilityInfo of addFacilityDto.facilities) {
      const facility = await this.facilityRepository.save({
        ...facilityInfo,
        floor,
      });
      saved.push(facility);
    }

    return saved;
  }

  async updateFacility(
    updateFacilityDto: UpdateFacilityRequestDto,
  ): Promise<UpdateFacilityResponseDto> {
    let updated = 0;

    for (const facilityInfo of updateFacilityDto.facilities) {
      const exist = await this.facilityRepository.findOne({
        where: { id: facilityInfo.id },
      });
      if (!exist) throw new NotFoundException('facility not found');

      const updateResult = await this.facilityRepository.update(
        exist.id,
        facilityInfo,
      );
      updated += updateResult.affected ?? 1;
    }

    return { updated };
  }

  async removeFacility({
    id,
  }: RemoveFacilityRequestDto): Promise<RemoveFacilityResponseDto> {
    const exist = await this.facilityRepository.findOneBy({ id });
    if (!exist) throw new NotFoundException('facility not found');

    return {
      removed:
        (await this.facilityRepository.delete(exist)).affected ?? 0,
    };
  }

  async findOneById(id: number) {
    return this.facilityRepository.findOne({
      where: { id },
      relations: { floor: true },
    });
  }
}
