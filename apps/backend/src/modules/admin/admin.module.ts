import { Module } from '@nestjs/common';

import { AdminService } from './admin.service';

@Module({
  imports: [],
  controllers: [],
  providers: [AdminService],
  exports: [AdminService],
})
export class AdminModule {}
