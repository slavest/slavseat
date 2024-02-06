import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Model } from '@slavseat/types';
import { Repository } from 'typeorm';

import { AddSeatDto } from './dto/addSeat.dto';
import { RemoveSeatDto } from './dto/removeSeat.dto';
import { Seat } from './entities/seat.entity';

@Injectable()
export class SeatService {
  constructor(
    @InjectRepository(Seat)
    private readonly seatRepository: Repository<Seat>,
  ) {}

  async addSeat(addSeatDto: AddSeatDto) {
    const savedSeats: Seat[] = [];

    for (const seat of addSeatDto.seats) {
      const existSeat = await this.findSeatByCoords(seat.x, seat.y);
      if (existSeat)
        throw new ConflictException(
          `${seat.x}, ${seat.y} seat is exists`,
        );

      const newSeat = await this.seatRepository.save(seat);
      savedSeats.push(newSeat);
    }

    return savedSeats;
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
