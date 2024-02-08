import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SeatModule } from '../seat/seat.module';
import { Floor } from './entity/floor.entity';
import { FloorController } from './floor.controller';
import { FloorService } from './floor.service';

@Module({
  imports: [TypeOrmModule.forFeature([Floor])],
  providers: [FloorService],
  controllers: [FloorController],
  exports: [FloorService],
})
export class FloorModule {}
