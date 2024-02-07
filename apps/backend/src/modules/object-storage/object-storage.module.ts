import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ObjectMeta } from './entity/objectMeta.entity';
import { ObjectStorageService } from './object-storage.service';

@Module({
  imports: [TypeOrmModule.forFeature([ObjectMeta])],
  exports: [ObjectStorageService],
  providers: [ObjectStorageService],
})
export class ObjectStorageModule {}
