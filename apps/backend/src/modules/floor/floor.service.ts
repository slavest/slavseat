import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Model } from '@slavseat/types';
import { Readable } from 'stream';
import { Repository } from 'typeorm';

import { ObjectStorageService } from '../object-storage/object-storage.service';
import { CreateFloorRequestDto } from './dto/request/createFloorRequest.dto';
import {
  UpdateFloorRequestBodyDto,
  UpdateFloorRequestParamDto,
} from './dto/request/updateFloorRequest.dto';
import { UploadFloorImageRequestDto } from './dto/request/uploadFloorImageRequest.dto';
import { UpdateFloorResponseDto } from './dto/response/updateFloorResponse.dto';
import { Floor } from './entity/floor.entity';

@Injectable()
export class FloorService {
  constructor(
    @InjectRepository(Floor)
    private readonly floorRepository: Repository<Floor>,
    private readonly objectStorageService: ObjectStorageService,
  ) {}

  async createFloor(createFloorRequestDto: CreateFloorRequestDto): Promise<Floor> {
    const existFloor = await this.floorRepository.findBy(createFloorRequestDto);
    if (!existFloor) throw new ConflictException(`${CreateFloorRequestDto.name} is already Exist`);

    return this.floorRepository.save(createFloorRequestDto);
  }

  async addImageToFloor(
    uploadFloorImageDto: UploadFloorImageRequestDto,
    file: Express.Multer.File,
  ): Promise<Floor> {
    const floor = await this.floorRepository.findOne({
      where: { id: uploadFloorImageDto.id },
      relations: { facilities: true },
    });
    if (!floor) throw new NotFoundException(`floor not found`);

    const filePath = [
      'floor',
      `${floor.name}-${floor.id}-${encodeURIComponent(file.originalname)}`,
    ].join('/');

    const objectMeta = await this.objectStorageService.save(
      Readable.from(file.buffer),
      filePath,
      file.mimetype,
      true,
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
      relations: { facilities: true, image: true },
    });
  }

  async updateFloor({
    id,
    ...updateFloorRequestDto
  }: UpdateFloorRequestParamDto & UpdateFloorRequestBodyDto): Promise<UpdateFloorResponseDto> {
    const existFloor = await this.floorRepository.findOneBy({
      id,
    });
    if (!existFloor) throw new NotFoundException('Floor not found');

    const updated = await this.floorRepository.update(existFloor.id, {
      ...updateFloorRequestDto,
    });

    return { updated: updated.affected ?? 0 };
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
