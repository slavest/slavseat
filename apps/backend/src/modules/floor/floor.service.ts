import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Model } from '@slavseat/types';
import { Repository } from 'typeorm';

import { ObjectStorageService } from '../object-storage/object-storage.service';
import { SeatService } from '../seat/seat.service';
import { CreateFloorRequestDto } from './dto/request/createFloorRequest.dto';
import { GetAllFloorResponseDto } from './dto/response/getAllFloorResponse.dto';
import { Floor } from './entity/floor.entity';

@Injectable()
export class FloorService {
  constructor(
    @InjectRepository(Floor)
    private readonly floorRepository: Repository<Floor>,
    private readonly objectStorageService: ObjectStorageService,
  ) {}

  async createFloor(
    createFloorRequestDto: CreateFloorRequestDto,
  ): Promise<Floor> {
    const existFloor = await this.floorRepository.findBy(
      createFloorRequestDto,
    );
    if (!existFloor)
      throw new ConflictException(
        `${CreateFloorRequestDto.name} is already Exist`,
      );

    return this.floorRepository.save(createFloorRequestDto);
  }

  async addImageToFloor(
    floorId: number,
    objectMetaId: number,
  ): Promise<Floor> {
    const floor = await this.floorRepository.findOneBy({
      id: floorId,
    });
    if (!floor)
      throw new NotFoundException(`${floorId} is not exist floor`);

    const objectMeta =
      await this.objectStorageService.findObjectMetaById(
        objectMetaId,
      );
    if (!objectMeta)
      throw new NotFoundException(
        `${objectMetaId} is not exist object`,
      );

    return this.floorRepository.save({
      ...floor,
      image: objectMeta,
    });
  }

  async getAllFloor(): Promise<Model.FloorSummary[]> {
    return this.floorRepository.find();
  }

  async findById(id: number): Promise<Floor> {
    return this.floorRepository.findOne({
      where: { id },
      relations: { seats: true, image: true },
    });
  }

  // async findFloorBySeatId(seatId: number) {
  //   const seat = await this.seatService.findSeatById(seatId);
  //   if (!seat)
  //     throw new NotFoundException(`${seatId} is not exist seat id`);

  //   // find includes seat
  //   const floor = await this.floorRepository.findOne({
  //     relations: ['seats'],
  //     where: {
  //       seats: { id: seatId },
  //     },
  //   });

  //   return floor;
  // }
}
