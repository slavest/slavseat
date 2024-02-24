import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FacilityModule } from '../facility/facility.module';
import { FloorModule } from '../floor/floor.module';
import { ObjectStorageModule } from '../object-storage/object-storage.module';
import { Seat } from './entity/seat.entity';
import { SeatController } from './seat.controller';
import { SeatService } from './seat.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Seat]),
    ObjectStorageModule,
    FloorModule,
    FacilityModule,
  ],
  providers: [SeatService],
  controllers: [SeatController],
  exports: [SeatService],
})
export class SeatModule {}
