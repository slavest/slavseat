import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';

import { SeatService } from '../seat/seat.service';
import { AddReserveRequestDto } from './dto/request/addReserveRequest.dto';
import { GetReserveByDateRequestDto } from './dto/request/getReserveByDateRequest.dto';
import { Reserve } from './entity/reserve.entity';

@Injectable()
export class ReserveService {
  constructor(
    @InjectRepository(Reserve)
    private readonly reserveRepository: Repository<Reserve>,
    private readonly seatService: SeatService,
  ) {}

  async addReserve(addReserveRequestDto: AddReserveRequestDto) {
    const { seatId, start, end } = addReserveRequestDto;

    if (start.getTime() >= end.getTime())
      throw new BadRequestException(`date invalid`);

    const seat = await this.seatService.findOneSeatById(seatId);
    if (!seat)
      throw new NotFoundException(`Seat ${seatId} Not Found `);

    const existReserve = await this.reserveRepository.findOne({
      where: [
        { seat: { id: seat.id }, start: Between(start, end) },
        { seat: { id: seat.id }, end: Between(start, end) },
      ],
    });
    if (existReserve) throw new ConflictException('Already Reserved');

    const reserve = this.reserveRepository.create({
      ...addReserveRequestDto,
      seat,
    });
    return this.reserveRepository.save(reserve);
  }

  async getReserveByDate(
    getReserveByDateRequestDto: GetReserveByDateRequestDto,
  ) {
    const { date } = getReserveByDateRequestDto;

    const startDate = new Date(date);
    startDate.setHours(0, 0, 0, 0);
    const endDate = new Date(date);
    endDate.setHours(23, 59, 59, 999);

    const reserves = await this.reserveRepository.find({
      where: {
        start: Between(startDate, endDate),
        end: Between(startDate, endDate),
      },
    });

    return reserves;
  }

  findReserveByUser(user: string) {
    return this.reserveRepository.find({ where: { user } });
  }
}
