import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AdminModule } from '../admin/admin.module';
import { ObjectStorageModule } from '../object-storage/object-storage.module';
import { Floor } from './entity/floor.entity';
import { FloorController } from './floor.controller';
import { FloorService } from './floor.service';

@Module({
  imports: [TypeOrmModule.forFeature([Floor]), ObjectStorageModule, AdminModule],
  providers: [FloorService],
  controllers: [FloorController],
  exports: [FloorService],
})
export class FloorModule {}
