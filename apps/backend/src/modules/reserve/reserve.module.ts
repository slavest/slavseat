import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';
import { BullBoardModule } from '@bull-board/nestjs';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SeatModule } from '../seat/seat.module';
import { Reserve } from './entity/reserve.entity';
import { ReserveConsumer } from './reserve.consumer';
import { ReserveController } from './reserve.controller';
import { ReserveService } from './reserve.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reserve]),
    SeatModule,
    BullModule.registerQueue({
      name: 'reserve',
    }),
    BullBoardModule.forFeature({
      name: 'reserve',
      adapter: BullMQAdapter,
    }),
  ],
  controllers: [ReserveController],
  providers: [ReserveService, ReserveConsumer],
})
export class ReserveModule {}
