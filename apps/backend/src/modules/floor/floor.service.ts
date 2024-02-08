import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { SeatService } from '../seat/seat.service';
import { CreateFloorDto } from './dto/request/createFloorRequest.dto';
import { GetAllFloorResponseDto } from './dto/response/getAllFloorResponse.dto';
import { Floor } from './entity/floor.entity';

@Injectable()
export class FloorService {
  constructor(
    @InjectRepository(Floor)
    private readonly floorRepository: Repository<Floor>,
    private readonly seatService: SeatService,
  ) {}

  async createFloor(createFloorDto: CreateFloorDto) {
    const existFloor =
      await this.floorRepository.findBy(createFloorDto);
    if (!existFloor)
      throw new ConflictException(
        `${CreateFloorDto.name} is already Exist`,
      );

    return this.floorRepository.save(createFloorDto);
  }

  async getAllFloor(): Promise<GetAllFloorResponseDto[]> {
    return this.floorRepository.find();
  }

  async findFloorById(id: number) {
    return this.floorRepository.find({
      where: { id },
      relations: { seats: true },
    });
  }

  async findFloorBySeatId(seatId: number) {
    const seat = await this.seatService.findSeatById(seatId);
    if (!seat)
      throw new NotFoundException(`${seatId} is not exist seat id`);

    // find includes seat
    const floor = await this.floorRepository.findOne({
      relations: ['seats'],
      where: {
        seats: { id: seatId },
      },
    });

    return floor;
  }

  async addSeatToFloor(seatId: number, floorId: number) {
    const seat = await this.seatService.findSeatById(seatId);
    if (!seat)
      throw new NotFoundException(`${seatId} is not exist seat id`);

    const floor = await this.floorRepository.findOneBy({
      id: floorId,
    });
    if (!floor)
      throw new NotFoundException(`${floorId} is not exist floor id`);

    floor.seats.push(seat);
    return this.floorRepository.save(floor);
  }
}
