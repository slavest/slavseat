import { Process, Processor } from '@nestjs/bull';
import {
  BadRequestException,
  ConflictException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from 'bull';
import { Between, MoreThanOrEqual, Repository } from 'typeorm';

import { SeatService } from '../seat/seat.service';
import { AddReserveRequestDto } from './dto/request/addReserveRequest.dto';
import { Reserve } from './entity/reserve.entity';
import { ReserveService } from './reserve.service';

@Processor('reserve')
export class ReserveConsumer {
  logger = new Logger(ReserveConsumer.name);

  constructor(
    private readonly seatService: SeatService,
    @InjectRepository(Reserve)
    private readonly reserveRepository: Repository<Reserve>,
  ) {}

  @Process()
  async addReserve(job: Job<AddReserveRequestDto>) {
    this.logger.debug(job.data);
    const { seatId, start, end = null, always } = job.data;
    const dateSearch = start && end;

    if (dateSearch && start.getTime() >= end.getTime())
      throw new BadRequestException(
        `시작 날짜는 종료 날짜보다 클 수 없습니다.`,
      );

    const seat = await this.seatService.findOneSeatById(seatId);
    if (!seat)
      throw new NotFoundException(`좌석을 찾을 수 없습니다.`);

    const existReserve = await this.reserveRepository.findOne({
      where: [
        dateSearch && {
          seat: { id: seat.id },
          start: Between(start, end),
        },
        dateSearch && {
          seat: { id: seat.id },
          end: Between(start, end),
        },
        always && {
          seat: { id: seat.id },
          start: MoreThanOrEqual(start),
        },
        always && {
          seat: { id: seat.id },
          end: MoreThanOrEqual(start),
        },
        { seat: { id: seat.id }, always: true },
      ].filter((item) => item !== undefined),
    });
    if (existReserve)
      throw new ConflictException(
        '이미 예약된 시간입니다. 예약 시간을 다시 확인해 주세요',
      );

    const reserve = this.reserveRepository.create({
      ...job.data,
      seat,
    });
    return this.reserveRepository.save(reserve);
  }
}
