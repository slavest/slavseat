import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Model } from '@slavseat/types';
import { Repository } from 'typeorm';

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
  ) {}

  async addSeat(addSeatRequestDto: AddSeatRequestDto) {
    const savedSeats: Seat[] = [];

    for (const seat of addSeatRequestDto.seats) {
      const existSeat = await this.findOneSeatByCoords(
        seat.x,
        seat.y,
      );
      if (existSeat)
        throw new ConflictException(
          `${seat.x}, ${seat.y} seat is exists`,
        );
      const floor = await this.floorService.findById(seat.floorId);
      if (!floor)
        throw new NotFoundException(
          `${seat.floorId} is not exist floor id`,
        );

      const newSeat = await this.seatRepository.save({
        ...seat,
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

  async getAllSeat(): Promise<Model.SeatSummary[]> {
    return this.seatRepository.find();
  }

  findOneSeatByCoords(x: number, y: number): Promise<Seat> {
    return this.seatRepository.findOne({
      where: { x, y },
      relations: { floor: true },
    });
  }

  findOneSeatById(id: number): Promise<Seat> {
    return this.seatRepository.findOne({
      where: { id },
      relations: { floor: true },
    });
  }

  findByFloorId(floorId: number): Promise<Seat[]> {
    return this.seatRepository.find({
      where: {
        floor: { id: floorId },
      },
      relations: {
        floor: true,
      },
    });
  }
}
