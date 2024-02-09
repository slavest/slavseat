import { Module, ValidationPipe, forwardRef } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

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
  ],
  providers: [SeatService],
  controllers: [SeatController],
  exports: [SeatService],
})
export class SeatModule {}