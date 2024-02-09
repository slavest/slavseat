import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ObjectStorageModule } from '../object-storage/object-storage.module';
import { Floor } from './entity/floor.entity';
import { FloorController } from './floor.controller';
import { FloorService } from './floor.service';

@Module({
  imports: [TypeOrmModule.forFeature([Floor]), ObjectStorageModule],
  providers: [FloorService],
  controllers: [FloorController],
  exports: [FloorService],
})
export class FloorModule {}
