import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SeatModule } from '../seat/seat.module';
import { Reserve } from './entities/reserve.entity';
import { ReserveController } from './reserve.controller';
import { ReserveService } from './reserve.service';

@Module({
  imports: [TypeOrmModule.forFeature([Reserve]), SeatModule],
  controllers: [ReserveController],
  providers: [ReserveService],
})
export class ReserveModule {}
