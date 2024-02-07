import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SeatModule } from '../seat/seat.module';
import { Floor } from './entity/floor.entity';
import { FloorController } from './floor.controller';
import { FloorService } from './floor.service';

@Module({
  imports: [TypeOrmModule.forFeature([Floor]), SeatModule],
  providers: [FloorService],
  controllers: [FloorController],
})
export class FloorModule {}
