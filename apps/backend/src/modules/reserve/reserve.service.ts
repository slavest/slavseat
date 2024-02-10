import { InjectQueue } from '@nestjs/bull';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Queue } from 'bull';
import { Between, MoreThanOrEqual, Repository } from 'typeorm';

import { SeatService } from '../seat/seat.service';
import { AddReserveRequestDto } from './dto/request/addReserveRequest.dto';
import { GetReserveByDateRequestDto } from './dto/request/getReserveByDateRequest.dto';
import { Reserve } from './entity/reserve.entity';

@Injectable()
export class ReserveService {
  constructor(
    @InjectRepository(Reserve)
    private readonly reserveRepository: Repository<Reserve>,
    @InjectQueue('reserve')
    private readonly reserveQueue: Queue<AddReserveRequestDto>,
    private readonly seatService: SeatService,
  ) {}

  async addReserve(
    addReserveRequestDto: AddReserveRequestDto,
  ): Promise<Reserve> {
    const job = await this.reserveQueue.add(addReserveRequestDto, {
      removeOnComplete: 5,
    });

    const result = await job.finished();
    return result;
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
      where: [
        {
          start: Between(startDate, endDate),
          end: Between(startDate, endDate),
        },
        {
          start: MoreThanOrEqual(startDate),
          always: true,
        },
      ],
    });

    return reserves;
  }

  findReserveByUser(user: string) {
    return this.reserveRepository.find({ where: { user } });
  }
}
