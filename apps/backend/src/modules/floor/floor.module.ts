import { Module } from '@nestjs/common';
import { FloorService } from './floor.service';
import { FloorController } from './floor.controller';

@Module({
  providers: [FloorService],
  controllers: [FloorController]
})
export class FloorModule {}
