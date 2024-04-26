import { RedisService } from '@liaoliaots/nestjs-redis';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Model } from '@slavseat/types';
import { Redis } from 'ioredis';
import { sleep } from 'src/libs/utils/common';
import { Between, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';

import { FacilityService } from '../facility/facility.service';
import { User } from '../user/entity/user.entity';
import { UserService } from '../user/user.service';
import { AddReserveRequestDto } from './dto/request/addReserveRequest.dto';
import { GetReserveByDateRequestDto } from './dto/request/getReserveByDateRequest.dto';
import { RemoveReserveRequestDto } from './dto/request/removeReserveRequest.dto';
import { GetReserveByDateResponseDto } from './dto/response/getReserveByDateResponse.dto';
import { RemoveReserveResponseDto } from './dto/response/removeReserveResponse.dto';
import { Reserve } from './entity/reserve.entity';
import { getFacilityLockKey } from './reserve.constant';

@Injectable()
export class ReserveService {
  private readonly redisClient: Redis;

  constructor(
    @InjectRepository(Reserve)
    private readonly reserveRepository: Repository<Reserve>,
    private readonly facilityService: FacilityService,
    private readonly userService: UserService,
    private readonly redisService: RedisService,
    private readonly configService: ConfigService,
  ) {
    this.redisClient = this.redisService.getClient();
  }

  async addReserve(
    userId: number,
    addReserveRequestDto: AddReserveRequestDto,
    retry: number = 0,
  ): Promise<Reserve> {
    const { facilityId, start, end = null, always } = addReserveRequestDto;
    const dateSearch = start && end;

    if (dateSearch && start.getTime() >= end.getTime())
      throw new BadRequestException(`시작 날짜는 종료 날짜보다 같거나 클 수 없습니다.`);

    const oneWeek = Date.now() + 1000 * 60 * 60 * 24 * 8;
    if (start.getTime() > oneWeek || (end && end.getTime() > oneWeek))
      throw new BadRequestException('최대 일주일 후 까지만 예약이 가능합니다.');

    // if (start.getTime() < Date.now())
    //   throw new BadRequestException('지난 시간은 예약할 수 없습니다.');

    if (!always && end === null)
      throw new BadRequestException('시간차 예약은 종료 시간이 포함되어야 합니다.');

    const facility = await this.facilityService.findOneById(facilityId);
    if (!facility) throw new NotFoundException(`시설을 찾을 수 없습니다.`);

    if (facility.type !== Model.FacilityType.SEAT)
      throw new BadRequestException('예약이 불가능한 시설입니다.');

    const lockKey = getFacilityLockKey(facility.id);
    const redisLock = await this.redisClient.incr(lockKey);

    if (redisLock > 1) {
      if (retry >= 3) {
        throw new ConflictException('시설 예약이 불가능합니다. 잠시 후 다시 시도해 주세요.');
      }

      await sleep(1000);
      return this.addReserve(userId, addReserveRequestDto, retry + 1);
    }

    try {
      const user = await this.userService.findById(userId);
      if (!user) throw new NotFoundException('유저를 찾을 수 없습니다.');

      const existReserve = await this.reserveRepository.findOne({
        where: [
          dateSearch && {
            facility: { id: facilityId },
            start: Between(start, end),
          },
          dateSearch && {
            facility: { id: facilityId },
            end: Between(start, end),
          },
          dateSearch && {
            facility: { id: facilityId },
            start: LessThanOrEqual(start),
            end: MoreThanOrEqual(end),
          },
          always && {
            facility: { id: facilityId },
            start: MoreThanOrEqual(start),
          },
          dateSearch && {
            user: { id: userId },
            start: Between(start, end),
          },
          dateSearch && {
            user: { id: userId },
            end: Between(start, end),
          },
          dateSearch && {
            user: { id: userId },
            start: LessThanOrEqual(start),
            end: MoreThanOrEqual(end),
          },
          dateSearch && {
            user: { id: userId },
            start: LessThanOrEqual(start),
            always: true,
          },
          always && {
            user: { id: userId },
            start: MoreThanOrEqual(start),
          },
          always && {
            user: { id: userId },
            start: LessThanOrEqual(start),
            always: true,
          },
        ].filter((item) => item !== undefined),
        relations: { facility: true, user: true },
      });
      if (existReserve.always)
        throw new BadRequestException('고정석 사용자는 새 예약을 할 수 없습니다.');

      if (existReserve) throw new ConflictException(existReserve);

      const reserve = this.reserveRepository.create({
        ...addReserveRequestDto,
        user,
        facility,
      });

      return await this.reserveRepository.save(reserve);
    } finally {
      await this.redisClient.del(lockKey);
    }
  }

  async removeReserve(
    userId: number,
    removeReserveDto: RemoveReserveRequestDto,
  ): Promise<RemoveReserveResponseDto> {
    const user = await this.userService.findById(userId);
    if (!user) throw new NotFoundException('유저를 찾을 수 없습니다.');
    const admins = this.configService.get('ADMINS') as string[] | undefined;
    let exist: Reserve;

    if (admins?.includes(user.email)) {
      exist = await this.reserveRepository.findOneBy({
        id: removeReserveDto.id,
      });
    } else {
      exist = await this.reserveRepository.findOneBy({
        id: removeReserveDto.id,
        user: { id: user.id },
      });
    }
    if (!exist) throw new NotFoundException('reserve not found');

    const removeResult = await this.reserveRepository.delete(exist.id);
    return { removed: removeResult.affected ?? 0 };
  }

  async getReserveByDate(
    getReserveByDateRequestDto: GetReserveByDateRequestDto,
  ): Promise<GetReserveByDateResponseDto[]> {
    const { date } = getReserveByDateRequestDto;

    const startDate = new Date(date);
    startDate.setHours(0, 0, 0, 0);
    const endDate = new Date(date);
    endDate.setHours(23, 59, 59, 999);

    const reserves = await this.reserveRepository.find({
      where: [
        {
          start: Between(startDate, endDate),
        },
        {
          end: Between(startDate, endDate),
        },
        {
          start: LessThanOrEqual(startDate),
          always: true,
        },
      ],
      relations: { facility: { floor: true }, user: true },
    });

    return reserves;
  }

  findReserveByUser(user: User) {
    return this.reserveRepository.find({
      where: { user: { id: user.id } },
      relations: { facility: { floor: true }, user: true },
    });
  }
}
