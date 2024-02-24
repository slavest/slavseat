import { InjectQueue } from '@nestjs/bull';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Model } from '@slavseat/types';
import { Queue } from 'bull';
import { Between, MoreThanOrEqual, Repository } from 'typeorm';

import { FacilityService } from '../facility/facility.service';
import { AddReserveRequestDto } from './dto/request/addReserveRequest.dto';
import { GetReserveByDateRequestDto } from './dto/request/getReserveByDateRequest.dto';
import { RemoveReserveRequestDto } from './dto/request/removeReserveRequest.dto';
import { GetReserveByDateResponseDto } from './dto/response/getReserveByDateResponse.dto';
import { RemoveReserveResponseDto } from './dto/response/removeReserveResponse.dto';
import { Reserve } from './entity/reserve.entity';

@Injectable()
export class ReserveService {
  constructor(
    @InjectRepository(Reserve)
    private readonly reserveRepository: Repository<Reserve>,
    @InjectQueue('reserve')
    private readonly reserveQueue: Queue<AddReserveRequestDto>,
    private readonly facilityService: FacilityService,
  ) {}

  async addReserveQueue(
    addReserveRequestDto: AddReserveRequestDto,
  ): Promise<Reserve> {
    const job = await this.reserveQueue.add(addReserveRequestDto, {
      removeOnComplete: true,
      removeOnFail: true,
    });

    try {
      const result = await job.finished();
      return result;
    } catch (err) {
      throw new InternalServerErrorException(
        `예약에 실패했습니다. ${err?.message}`,
      );
    }
  }

  async addReserve(
    addReserveRequestDto: AddReserveRequestDto,
  ): Promise<Reserve> {
    const {
      facilityId,
      start,
      end = null,
      always,
    } = addReserveRequestDto;
    const dateSearch = start && end;

    if (dateSearch && start.getTime() >= end.getTime())
      throw new Error(
        `시작 날짜는 종료 날짜보다 같거나 클 수 없습니다.`,
      );

    const facility =
      await this.facilityService.findOneById(facilityId);
    if (!facility)
      throw new NotFoundException(`시설을 찾을 수 없습니다.`);

    if (facility.type !== Model.FacilityType.SEAT)
      throw new BadRequestException('예약이 불가능한 시설입니다.');

    const existReserve = await this.reserveRepository.findOne({
      where: [
        dateSearch && {
          facility: { id: facility.id },
          start: Between(start, end),
        },
        dateSearch && {
          facility: { id: facility.id },
          end: Between(start, end),
        },
        always && {
          facility: { id: facility.id },
          start: MoreThanOrEqual(start),
        },
        always && {
          facility: { id: facility.id },
          end: MoreThanOrEqual(start),
        },
        { facility: { id: facility.id }, always: true },
      ].filter((item) => item !== undefined),
    });
    if (existReserve)
      throw new Error(
        '이미 예약된 시간입니다. 예약 시간을 다시 확인해 주세요',
      );

    const reserve = this.reserveRepository.create({
      ...addReserveRequestDto,
      facility,
    });
    return this.reserveRepository.save(reserve);
  }

  async removeReserve(
    removeReserveDto: RemoveReserveRequestDto,
  ): Promise<RemoveReserveResponseDto> {
    const exist = await this.reserveRepository.findOneBy({
      id: removeReserveDto.id,
    });
    if (!exist) throw new NotFoundException('reserve not found');

    const removeResult = await this.reserveRepository.delete(exist);
    return { removed: removeResult.affected ?? 0 };
  }

  async getReserveByDate(
    getReserveByDateRequestDto: GetReserveByDateRequestDto,
  ): Promise<GetReserveByDateResponseDto[]> {
    const { date } = getReserveByDateRequestDto;

    const startDate = new Date(date);
    startDate.setUTCHours(0, 0, 0, 0);
    const endDate = new Date(date);
    endDate.setUTCHours(23, 59, 59, 999);
    console.log({ startDate, endDate });

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
      relations: { facility: { floor: true } },
    });

    return reserves;
  }

  findReserveByUser(user: string) {
    return this.reserveRepository.find({
      where: { user },
      relations: { facility: { floor: true } },
    });
  }
}
