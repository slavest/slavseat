import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Model } from '@slavseat/types';
import { Repository } from 'typeorm';
import { Transactional } from 'typeorm-transactional';

import { FacilityService } from '../facility/facility.service';
import { FloorService } from '../floor/floor.service';
import { AddSeatRequestDto } from './dto/request/addSeatRequest.dto';
import { RemoveSeatRequestDto } from './dto/request/removeSeatRequest.dto';
import { Seat } from './entity/seat.entity';

@Injectable()
export class SeatService {
  constructor(
    @InjectRepository(Seat)
    private readonly seatRepository: Repository<Seat>,
    private readonly floorService: FloorService,
    private readonly gridObjectService: FacilityService,
  ) {}

  @Transactional()
  async addSeat(addSeatRequestDto: AddSeatRequestDto) {
    const savedSeats: Seat[] = [];

    for (const seat of addSeatRequestDto.seats) {
      console.log({ seat });
      const existSeat = await this.findOneSeatByCoords(
        seat.gridObject.x,
        seat.gridObject.y,
      );
      if (existSeat) throw new ConflictException(`seat is exists`);
      const floor = await this.floorService.findById(seat.floorId);
      if (!floor) throw new NotFoundException(`floor not found`);

      // const gridObject = await this.gridObjectService.addGridObject({
      //   ...seat.gridObject,
      //   floorId: floor.id,
      //   type: Model.FacilityType.SEAT,
      // });

      const newSeat = await this.seatRepository.save({
        ...seat,
        // gridObject,
        floor,
      });
      savedSeats.push(newSeat);
    }

    return savedSeats;
  }

  async removeSeat(removeSeatReuqestDto: RemoveSeatRequestDto) {
    const exist = await this.seatRepository.findOneBy(
      removeSeatReuqestDto,
    );
    if (!exist)
      throw new NotFoundException(
        `${removeSeatReuqestDto.id} is not exist seat id`,
      );

    await this.seatRepository.delete(exist);
  }

  async getAllSeat() {
    return this.seatRepository.find();
  }

  findOneSeatByCoords(x: number, y: number): Promise<Seat> {
    return this.seatRepository.findOne({
      where: { gridObject: { x, y } },
      relations: { floor: true, gridObject: true },
    });
  }

  findOneSeatById(id: number): Promise<Seat> {
    return this.seatRepository.findOne({
      where: { id },
      relations: { floor: true, gridObject: true },
    });
  }

  findByFloorId(floorId: number): Promise<Seat[]> {
    return this.seatRepository.find({
      where: {
        floor: { id: floorId },
      },
      relations: {
        floor: true,
        gridObject: true,
      },
    });
  }
}
