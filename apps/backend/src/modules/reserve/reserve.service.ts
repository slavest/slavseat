import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
    private readonly seatService: SeatService,
  ) {}

  async addReserve(addReserveRequestDto: AddReserveRequestDto) {
    const {
      seatId,
      start,
      end = null,
      always,
    } = addReserveRequestDto;
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
