// import { INestApplication } from '@nestjs/common';
// import { Test } from '@nestjs/testing';
// import { Model } from '@slavseat/types';
// import { AppModule } from 'src/app.module';
// import { DatabaseModule } from 'src/libs/database/database.module';
// import { RedisModule } from 'src/libs/redis/redis.module';
// import { AuthService } from 'src/modules/auth/auth.service';
// import { Facility } from 'src/modules/facility/entity/facility.entity';
// import { FacilityService } from 'src/modules/facility/facility.service';
// import { Floor } from 'src/modules/floor/entity/floor.entity';
// import { FloorService } from 'src/modules/floor/floor.service';
// import { AddReserveRequestDto } from 'src/modules/reserve/dto/request/addReserveRequest.dto';
// import { GetReserveByDateRequestDto } from 'src/modules/reserve/dto/request/getReserveByDateRequest.dto';
// import { Reserve } from 'src/modules/reserve/entity/reserve.entity';
// import { ReserveService } from 'src/modules/reserve/reserve.service';
// import { User } from 'src/modules/user/entity/user.entity';
// import { UserService } from 'src/modules/user/user.service';
// import * as request from 'supertest';
// import { TestRedisModule } from 'test/TestRedisModule';
// import { Connection, EntityManager, QueryRunner } from 'typeorm';

// import { TestDatabaseModule } from '../TestDatabaseModule';

// describe('/reserve API', () => {
//   let app: INestApplication;
//   let queryRunner: QueryRunner;
//   let user1AccessToken: string;
//   let user2AccessToken: string;
//   let user3AccessToken: string;
//   let user1: User;
//   let user2: User;
//   let user3: User;
//   let floor1: Floor;
//   let facility1: Facility;
//   let facility2: Facility;
//   let facility3: Facility;
//   let reserve2: Reserve;
//   let reserve3: Reserve;

//   beforeAll(async () => {
//     const moduleRef = await Test.createTestingModule({
//       imports: [AppModule],
//     })
//       .overrideModule(DatabaseModule)
//       .useModule(TestDatabaseModule)
//       .overrideModule(RedisModule)
//       .useModule(TestRedisModule)
//       .compile();

//     app = moduleRef.createNestApplication();
//     await app.init();

//     const userService = moduleRef.get(UserService);
//     const authService = moduleRef.get(AuthService);
//     const floorService = moduleRef.get(FloorService);
//     const facilityService = moduleRef.get(FacilityService);
//     const reserveService = moduleRef.get(ReserveService);
//     const manager = moduleRef.get(EntityManager);
//     const connection = moduleRef.get(Connection);

//     // @ts-ignore
//     manager.queryRunner = connection.createQueryRunner('master');
//     queryRunner = manager.queryRunner;

//     user1 = await userService.saveUser({
//       name: 'user-1',
//       email: 'user-1@example.com',
//       providerId: 'providerid-1',
//     });
//     user2 = await userService.saveUser({
//       name: 'user-2',
//       email: 'user-2@example.com',
//       providerId: 'providerid-2',
//     });
//     user3 = await userService.saveUser({
//       name: 'user-3',
//       email: 'user-3@example.com',
//       providerId: 'providerid-3',
//     });
//     user1AccessToken = authService.createAccessToken(user1);
//     user2AccessToken = authService.createAccessToken(user2);
//     user3AccessToken = authService.createAccessToken(user3);

//     floor1 = await floorService.createFloor({ name: 'floor-1' });
//     [facility1, facility2, facility3] =
//       await facilityService.addFacility({
//         floorId: floor1.id,
//         facilities: [
//           {
//             name: 'facility-1',
//             x: 1,
//             y: 1,
//             w: 1,
//             h: 1,
//             type: Model.FacilityType.SEAT,
//           },
//           {
//             name: 'facility-2',
//             x: 2,
//             y: 2,
//             w: 2,
//             h: 2,
//             type: Model.FacilityType.SEAT,
//           },
//           {
//             name: 'facility-3',
//             x: 3,
//             y: 3,
//             w: 3,
//             h: 3,
//             type: Model.FacilityType.SEAT,
//           },
//         ],
//       });

//     reserve2 = await reserveService.addReserve(user2, {
//       facilityId: facility2.id,
//       start: new Date('2024-02-01T12:00:00'),
//       end: null,
//       always: true,
//     });
//     reserve3 = await reserveService.addReserve(user3, {
//       facilityId: facility3.id,
//       start: new Date('2024-02-01T12:00:00'),
//       end: new Date('2024-02-01T17:00:00'),
//       always: false,
//     });
//   });

//   beforeEach(async () => {
//     await queryRunner.startTransaction();
//   });

//   afterEach(async () => {
//     await queryRunner.rollbackTransaction();
//   });

//   describe('GET /reserve', () => {
//     it('[유저 기준 예약 조회]', async () => {
//       const res = await request(app.getHttpServer())
//         .get(`/api/reserve/user`)
//         .set({ Authorization: `bearer ${user3AccessToken}` });

//       expect(res.status).toBe(200);
//       expect(res.body.length).toBe(1);
//       expect(res.body?.[0].facility.id).toBe(facility3.id);
//       expect(res.body?.[0].facility.floor.id).toBe(
//         facility3.floor.id,
//       );
//     });

//     it('[날짜 기준 예약 조회]', async () => {
//       const data: GetReserveByDateRequestDto = {
//         date: new Date('2024-02-01'),
//       };

//       const res = await request(app.getHttpServer())
//         .get(`/api/reserve`)
//         .query(data);

//       expect(res.status).toBe(200);
//       expect(res.body.length).toBe(2);
//       // expect(res.body?.[0].seat.id).toBe(seat3.id);
//       // expect(res.body?.[0].seat.floor.id).toBe(seat3.floor.id);
//     });
//   });

//   describe('POST /reserve', () => {
//     it('[예약 테스트]', async () => {
//       const data: AddReserveRequestDto = {
//         facilityId: facility1.id,
//         start: new Date('2024-02-01T12:00:00'),
//         end: new Date('2024-02-01T17:00:00'),
//         always: false,
//       };

//       const res = await request(app.getHttpServer())
//         .post(`/api/reserve`)
//         .set({ Authorization: `bearer ${user1AccessToken}` })
//         .send(data);

//       expect(res.status).toBe(201);
//       expect(res.body?.facility.id).toBe(data.facilityId);
//       expect(res.body?.user?.id).toBe(user1.id);
//       expect(new Date(res.body?.start)).toEqual(data.start);
//       expect(new Date(res.body?.end)).toEqual(data.end);
//       expect(res.body?.always).toBe(data.always);
//     });

//     it('[고정석 예약 테스트]', async () => {
//       const data: AddReserveRequestDto = {
//         facilityId: facility1.id,
//         start: new Date('2024-02-01T12:00:00'),
//         end: null,
//         always: true,
//       };

//       const res = await request(app.getHttpServer())
//         .post(`/api/reserve`)
//         .set({ Authorization: `bearer ${user1AccessToken}` })
//         .send(data);

//       expect(res.status).toBe(201);
//       expect(res.body?.facility.id).toBe(data.facilityId);
//       expect(res.body?.user?.id).toBe(user1.id);
//       expect(new Date(res.body?.start)).toEqual(data.start);
//       expect(res.body?.end).toBeNull();
//       expect(res.body?.always).toBe(data.always);
//     });

//     it('[중복 예약 테스트]', async () => {
//       const data: AddReserveRequestDto = {
//         facilityId: facility1.id,
//         start: new Date('2024-02-01T12:00:00'),
//         end: new Date('2024-02-01T17:00:00'),
//         always: false,
//       };

//       await request(app.getHttpServer())
//         .post(`/api/reserve`)
//         .set({ Authorization: `bearer ${user1AccessToken}` })
//         .send(data);

//       const res = await request(app.getHttpServer())
//         .post(`/api/reserve`)
//         .set({ Authorization: `bearer ${user2AccessToken}` })
//         .send(data);

//       expect(res.status).toBe(409);
//       expect(res.body.message).toBeDefined();
//     });

//     it('[예약 동시성 테스트]', async () => {
//       const data: AddReserveRequestDto = {
//         facilityId: facility1.id,
//         start: new Date('2024-02-01T12:00:00'),
//         end: new Date('2024-02-01T17:00:00'),
//         always: false,
//       };

//       const concurrencyCount = 100;
//       const res = await Promise.all(
//         new Array(concurrencyCount).fill(0).map(() =>
//           request(app.getHttpServer())
//             .post(`/api/reserve`)
//             .set({ Authorization: `bearer ${user1AccessToken}` })
//             .send(data),
//         ),
//       );

//       const failedCount = res.filter(
//         (response) => response.status !== 201,
//       );

//       expect(failedCount.length).toBe(concurrencyCount - 1);
//     });
//   });
// });
