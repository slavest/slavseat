import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';

import { SeatService } from '../seat/seat.service';
import { AddReserveDto } from './dto/addReserve.dto';
import { GetReserveByDate } from './dto/getReserveByDate.dto';
import { Reserve } from './entity/reserve.entity';

@Injectable()
export class ReserveService {
  constructor(
    @InjectRepository(Reserve)
    private readonly reserveRepository: Repository<Reserve>,
    private readonly seatService: SeatService,
  ) {}

  async addReserve(addReserveDto: AddReserveDto) {
    const { seatId, start, end } = addReserveDto;

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
      ...addReserveDto,
      seat,
    });
    return this.reserveRepository.save(reserve);
  }

  async getReserveByDate(getReserveByDate: GetReserveByDate) {
    const { date } = getReserveByDate;

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
