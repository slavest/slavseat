import { Module } from '@nestjs/common';

import { ObjectStorageModule } from '../object-storage/object-storage.module';
import { ImageController } from './image.controller';

@Module({
  imports: [ObjectStorageModule],
  controllers: [ImageController],
})
export class ImageModule {}
