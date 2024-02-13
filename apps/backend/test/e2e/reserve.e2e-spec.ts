import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { DatabaseModule } from 'src/libs/database/database.module';
import { RedisBullModule } from 'src/libs/redis-bull/redis-bull.module';
import { Floor } from 'src/modules/floor/entity/floor.entity';
import { FloorService } from 'src/modules/floor/floor.service';
import { AddReserveRequestDto } from 'src/modules/reserve/dto/request/addReserveRequest.dto';
import { GetReserveByDateRequestDto } from 'src/modules/reserve/dto/request/getReserveByDateRequest.dto';
import { GetReserveByUserRequestDto } from 'src/modules/reserve/dto/request/getReserveByUserRequest.dto';
import { Reserve } from 'src/modules/reserve/entity/reserve.entity';
import { ReserveService } from 'src/modules/reserve/reserve.service';
import { Seat } from 'src/modules/seat/entity/seat.entity';
import { SeatService } from 'src/modules/seat/seat.service';
import * as request from 'supertest';
import { TestRedisBullModule } from 'test/TestRedisBullModule';
import { Connection, EntityManager, QueryRunner } from 'typeorm';

import { TestDatabaseModule } from '../TestDatabaseModule';

describe('/reserve API', () => {
  let app: INestApplication;
  let queryRunner: QueryRunner;
  let floor1: Floor;
  let seat1: Seat;
  let seat2: Seat;
  let seat3: Seat;
  let reserve3: Reserve;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideModule(DatabaseModule)
      .useModule(TestDatabaseModule)
      .overrideModule(RedisBullModule)
      .useModule(TestRedisBullModule)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();

    const floorService = moduleRef.get(FloorService);
    const seatService = moduleRef.get(SeatService);
    const reserveService = moduleRef.get(ReserveService);
    const manager = moduleRef.get(EntityManager);
    const connection = moduleRef.get(Connection);

    // @ts-ignore
    manager.queryRunner = connection.createQueryRunner('master');
    queryRunner = manager.queryRunner;

    floor1 = await floorService.createFloor({ name: 'floor-1' });
    seat1 = await seatService
      .addSeat({
        seats: [{ label: 'seat-1', x: 1, y: 1, floorId: floor1.id }],
      })
      .then((res) => res.at(0));
    seat2 = await seatService
      .addSeat({
        seats: [{ label: 'seat-2', x: 2, y: 2, floorId: floor1.id }],
      })
      .then((res) => res.at(0));
    seat3 = await seatService
      .addSeat({
        seats: [{ label: 'seat-3', x: 3, y: 3, floorId: floor1.id }],
      })
      .then((res) => res.at(0));

    reserve3 = await reserveService.addReserveQueue({
      seatId: seat3.id,
      user: 'user-3',
      start: new Date('2024-02-01T12:00:00'),
      end: new Date('2024-02-01T17:00:00'),
      always: false,
    });
  });

  beforeEach(async () => {
    await queryRunner.startTransaction();
  });

  afterEach(async () => {
    await queryRunner.rollbackTransaction();
  });

  describe('GET /reserve', () => {
    it('[유저 기준 예약 조회]', async () => {
      const data: GetReserveByUserRequestDto = {
        user: reserve3.user,
      };

      const res = await request(app.getHttpServer()).get(
        `/reserve/user/${data.user}`,
      );

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(1);
      expect(res.body?.[0].seat.id).toBe(seat3.id);
      expect(res.body?.[0].seat.floor.id).toBe(seat3.floor.id);
    });

    it('[날짜 기준 예약 조회]', async () => {
      const data: GetReserveByDateRequestDto = {
        date: new Date('2024-02-01'),
      };

      const res = await request(app.getHttpServer())
        .get(`/reserve`)
        .query(data);

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(1);
      expect(res.body?.[0].seat.id).toBe(seat3.id);
      expect(res.body?.[0].seat.floor.id).toBe(seat3.floor.id);
    });
  });

  describe('POST /reserve', () => {
    it('[예약 테스트]', async () => {
      const data: AddReserveRequestDto = {
        seatId: seat1.id,
        user: 'user-1',
        start: new Date('2024-02-01T12:00:00'),
        end: new Date('2024-02-01T17:00:00'),
        always: false,
      };

      const res = await request(app.getHttpServer())
        .post(`/reserve`)
        .send(data);

      expect(res.status).toBe(201);
      expect(res.body?.seat.id).toBe(data.seatId);
      expect(res.body?.user).toBe(data.user);
      expect(new Date(res.body?.start)).toEqual(data.start);
      expect(new Date(res.body?.end)).toEqual(data.end);
      expect(res.body?.always).toBe(data.always);
    });

    it('[중복 예약 테스트]', async () => {
      const data: AddReserveRequestDto = {
        seatId: seat1.id,
        user: 'user-1',
        start: new Date('2024-02-01T12:00:00'),
        end: new Date('2024-02-01T17:00:00'),
        always: false,
      };

      await request(app.getHttpServer()).post(`/reserve`).send(data);

      const res = await request(app.getHttpServer())
        .post(`/reserve`)
        .send(data);

      expect(res.status).toBe(500);
      expect(res.body.message).toBeDefined();
    });

    it('[예약 동시성 테스트]', async () => {
      const data: AddReserveRequestDto = {
        seatId: seat1.id,
        user: 'user-1',
        start: new Date('2024-02-01T12:00:00'),
        end: new Date('2024-02-01T17:00:00'),
        always: false,
      };

      const concurrencyCount = 100;
      const res = await Promise.all(
        new Array(concurrencyCount)
          .fill(0)
          .map((_, i) =>
            request(app.getHttpServer()).post(`/reserve`).send(data),
          ),
      );

      const failedCount = res.filter(
        (response) => response.status !== 201,
      );

      expect(failedCount.length).toBe(concurrencyCount - 1);
    });
  });
});
