import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Model } from '@slavseat/types';
import { Repository } from 'typeorm';

import { FloorService } from '../floor/floor.service';
import { AddSeatDto } from './dto/addSeat.dto';
import { RemoveSeatDto } from './dto/removeSeat.dto';
import { Seat } from './entity/seat.entity';

@Injectable()
export class SeatService {
  constructor(
    @InjectRepository(Seat)
    private readonly seatRepository: Repository<Seat>,
    private readonly floorService: FloorService,
  ) {}

  async addSeat(addSeatDto: AddSeatDto) {
    const savedSeats: Seat[] = [];

    for (const seat of addSeatDto.seats) {
      const existSeat = await this.findSeatByCoords(seat.x, seat.y);
      if (existSeat)
        throw new ConflictException(
          `${seat.x}, ${seat.y} seat is exists`,
        );
      const floor = await this.floorService.findFloorById(
        seat.floorId,
      );
      if (!floor)
        throw new NotFoundException(
          `${seat.floorId} is not exist floor id`,
        );

      const newSeat = await this.seatRepository.save(seat);
      savedSeats.push(newSeat);
    }

    return savedSeats;
  }

  async addSeatToFloor(seatId: number, floorId: number) {
    const seat = await this.findSeatById(seatId);
    if (!seat)
      throw new NotFoundException(`${seatId} is not exist seat id`);

    const floor = await this.floorService.findFloorById(floorId);
    if (!floor)
      throw new NotFoundException(`${floorId} is not exist floor id`);

    floor.seats.push(seat);
    return this.floorRepository.save(floor);
  }

  async getAllSeat() {
    return this.seatRepository.find();
  }

  async removeSeat(removeSeatDto: RemoveSeatDto) {
    const exist = await this.seatRepository.findOneBy(removeSeatDto);
    if (!exist)
      throw new NotFoundException(
        `${removeSeatDto.id} is not exist seat id`,
      );

    await this.seatRepository.delete(exist);
  }

  findSeatByCoords(x: number, y: number) {
    return this.seatRepository.findOneBy({ x, y });
  }

  findSeatById(id: number) {
    return this.seatRepository.findOneBy({ id });
  }
}
