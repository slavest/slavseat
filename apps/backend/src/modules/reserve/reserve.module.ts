import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';
import { BullBoardModule } from '@bull-board/nestjs';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FacilityModule } from '../facility/facility.module';
import { SeatModule } from '../seat/seat.module';
import { Reserve } from './entity/reserve.entity';
import { ReserveController } from './reserve.controller';
import { ReserveProcessor } from './reserve.processor';
import { ReserveService } from './reserve.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reserve]),
    FacilityModule,
    BullModule.registerQueue({
      name: 'reserve',
    }),
    BullBoardModule.forFeature({
      name: 'reserve',
      adapter: BullMQAdapter,
    }),
  ],
  controllers: [ReserveController],
  providers: [ReserveService, ReserveProcessor],
})
export class ReserveModule {}
