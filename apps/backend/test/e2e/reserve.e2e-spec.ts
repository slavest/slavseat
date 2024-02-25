import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { Model } from '@slavseat/types';
import { AppModule } from 'src/app.module';
import { DatabaseModule } from 'src/libs/database/database.module';
import { RedisModule } from 'src/libs/redis/redis.module';
import { Facility } from 'src/modules/facility/entity/facility.entity';
import { FacilityService } from 'src/modules/facility/facility.service';
import { Floor } from 'src/modules/floor/entity/floor.entity';
import { FloorService } from 'src/modules/floor/floor.service';
import { AddReserveRequestDto } from 'src/modules/reserve/dto/request/addReserveRequest.dto';
import { GetReserveByDateRequestDto } from 'src/modules/reserve/dto/request/getReserveByDateRequest.dto';
import { GetReserveByUserRequestDto } from 'src/modules/reserve/dto/request/getReserveByUserRequest.dto';
import { Reserve } from 'src/modules/reserve/entity/reserve.entity';
import { ReserveService } from 'src/modules/reserve/reserve.service';
import * as request from 'supertest';
import { TestRedisModule } from 'test/TestRedisModule';
import { Connection, EntityManager, QueryRunner } from 'typeorm';

import { TestDatabaseModule } from '../TestDatabaseModule';

describe('/reserve API', () => {
  let app: INestApplication;
  let queryRunner: QueryRunner;
  let floor1: Floor;
  let facility1: Facility;
  let facility2: Facility;
  let facility3: Facility;
  let reserve2: Reserve;
  let reserve3: Reserve;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideModule(DatabaseModule)
      .useModule(TestDatabaseModule)
      .overrideModule(RedisModule)
      .useModule(TestRedisModule)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();

    const floorService = moduleRef.get(FloorService);
    const facilityService = moduleRef.get(FacilityService);
    const reserveService = moduleRef.get(ReserveService);
    const manager = moduleRef.get(EntityManager);
    const connection = moduleRef.get(Connection);

    // @ts-ignore
    manager.queryRunner = connection.createQueryRunner('master');
    queryRunner = manager.queryRunner;

    floor1 = await floorService.createFloor({ name: 'floor-1' });
    [facility1, facility2, facility3] =
      await facilityService.addFacility({
        floorId: floor1.id,
        facilities: [
          {
            name: 'facility-1',
            x: 1,
            y: 1,
            w: 1,
            h: 1,
            type: Model.FacilityType.SEAT,
          },
          {
            name: 'facility-2',
            x: 2,
            y: 2,
            w: 2,
            h: 2,
            type: Model.FacilityType.SEAT,
          },
          {
            name: 'facility-3',
            x: 3,
            y: 3,
            w: 3,
            h: 3,
            type: Model.FacilityType.SEAT,
          },
        ],
      });

    reserve2 = await reserveService.addReserve({
      facilityId: facility2.id,
      user: 'user-2',
      start: new Date('2024-02-01T12:00:00'),
      end: null,
      always: true,
    });
    reserve3 = await reserveService.addReserve({
      facilityId: facility3.id,
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
      expect(res.body?.[0].facility.id).toBe(facility3.id);
      expect(res.body?.[0].facility.floor.id).toBe(
        facility3.floor.id,
      );
    });

    it('[날짜 기준 예약 조회]', async () => {
      const data: GetReserveByDateRequestDto = {
        date: new Date('2024-02-01'),
      };

      const res = await request(app.getHttpServer())
        .get(`/reserve`)
        .query(data);

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      // expect(res.body?.[0].seat.id).toBe(seat3.id);
      // expect(res.body?.[0].seat.floor.id).toBe(seat3.floor.id);
    });
  });

  describe('POST /reserve', () => {
    it('[예약 테스트]', async () => {
      const data: AddReserveRequestDto = {
        facilityId: facility1.id,
        user: 'user-1',
        start: new Date('2024-02-01T12:00:00'),
        end: new Date('2024-02-01T17:00:00'),
        always: false,
      };

      const res = await request(app.getHttpServer())
        .post(`/reserve`)
        .send(data);

      expect(res.status).toBe(201);
      expect(res.body?.facility.id).toBe(data.facilityId);
      expect(res.body?.user).toBe(data.user);
      expect(new Date(res.body?.start)).toEqual(data.start);
      expect(new Date(res.body?.end)).toEqual(data.end);
      expect(res.body?.always).toBe(data.always);
    });

    it('[고정석 예약 테스트]', async () => {
      const data: AddReserveRequestDto = {
        facilityId: facility1.id,
        user: 'user-1',
        start: new Date('2024-02-01T12:00:00'),
        end: null,
        always: true,
      };

      const res = await request(app.getHttpServer())
        .post(`/reserve`)
        .send(data);

      expect(res.status).toBe(201);
      expect(res.body?.facility.id).toBe(data.facilityId);
      expect(res.body?.user).toBe(data.user);
      expect(new Date(res.body?.start)).toEqual(data.start);
      expect(res.body?.end).toBeNull();
      expect(res.body?.always).toBe(data.always);
    });

    it('[중복 예약 테스트]', async () => {
      const data: AddReserveRequestDto = {
        facilityId: facility1.id,
        user: 'user-1',
        start: new Date('2024-02-01T12:00:00'),
        end: new Date('2024-02-01T17:00:00'),
        always: false,
      };

      await request(app.getHttpServer()).post(`/reserve`).send(data);

      const res = await request(app.getHttpServer())
        .post(`/reserve`)
        .send(data);

      expect(res.status).toBe(409);
      expect(res.body.message).toBeDefined();
    });

    it('[예약 동시성 테스트]', async () => {
      const data: AddReserveRequestDto = {
        facilityId: facility1.id,
        user: 'user-1',
        start: new Date('2024-02-01T12:00:00'),
        end: new Date('2024-02-01T17:00:00'),
        always: false,
      };

      const concurrencyCount = 100;
      const res = await Promise.all(
        new Array(concurrencyCount)
          .fill(0)
          .map(() =>
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
