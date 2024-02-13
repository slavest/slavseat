import { BullModule } from '@nestjs/bull';
import { Test } from '@nestjs/testing';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { ConfigurationModule } from 'src/libs/config/config.module';
import { DatabaseModule } from 'src/libs/database/database.module';
import { Floor } from 'src/modules/floor/entity/floor.entity';
import { FloorService } from 'src/modules/floor/floor.service';
import { ObjectMeta } from 'src/modules/object-storage/entity/objectMeta.entity';
import { ObjectStorageService } from 'src/modules/object-storage/object-storage.service';
import { Reserve } from 'src/modules/reserve/entity/reserve.entity';
import { ReserveService } from 'src/modules/reserve/reserve.service';
import { Seat } from 'src/modules/seat/entity/seat.entity';
import { SeatService } from 'src/modules/seat/seat.service';
import { Repository } from 'typeorm';

// describe('ReserveService', () => {
//   let reserveService: ReserveService;
//   let seatService: SeatService;
//   let floorService: FloorService;

//   beforeEach(async () => {
//     const moduleRef = await Test.createTestingModule({
//       imports: [
//         ConfigurationModule,
//         DatabaseModule,
//         TypeOrmModule.forFeature([Seat, Reserve, Floor, ObjectMeta]),
//         BullModule.registerQueue({
//           name: 'reserve',
//         }),
//       ],
//       providers: [
//         ReserveService,
//         SeatService,
//         FloorService,
//         ObjectStorageService,
//       ],
//     }).compile();

//     reserveService = moduleRef.get<ReserveService>(ReserveService);
//     seatService = moduleRef.get<SeatService>(SeatService);
//     floorService = moduleRef.get<FloorService>(FloorService);
//   });

//   it('should be defined', () => {
//     expect(reserveService).toBeDefined();
//     expect(seatService).toBeDefined();
//   });

//   describe('좌석 예약', () => {
//     it('단일 좌석 예약 테스트', async () => {
//       const floor = {
//         name: 'floor-1',
//       };
//       const createdFloor = await floorService.createFloor(floor);
//       expect(
//         (await floorService.findById(createdFloor.id)).id,
//       ).toEqual(createdFloor.id);

//       const seat = {
//         id: 1,
//         label: 'seat-1',
//         x: 0,
//         y: 0,
//       };

//       const createdSeat = (
//         await seatService.addSeat({
//           seats: [{ ...seat, floorId: createdFloor.id }],
//         })
//       ).at(0);
//       expect(
//         (await seatService.findOneSeatById(createdSeat.id)).id,
//       ).toStrictEqual(createdSeat.id);

//       const requestCount = 5;
//       const result = await Promise.all(
//         new Array(requestCount).fill(0).map((_, i) =>
//           reserveService
//             .addReserve({
//               start: new Date('2024-02-01 12:00:00'),
//               end: new Date('2024-02-01 17:00:00'),
//               seatId: createdSeat.id,
//               user: 'user-1',
//               always: false,
//             })
//             .catch((err) => {
//               console.log(err);
//               return null;
//             }),
//         ),
//       );

//       expect(result.filter((res) => res === null).length).toBe(
//         requestCount - 1,
//       );
//     });
//   });
// });
