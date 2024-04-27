import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisModule } from 'src/libs/redis/redis.module';

import { AdminModule } from '../admin/admin.module';
import { FacilityModule } from '../facility/facility.module';
import { UserModule } from '../user/user.module';
import { Reserve } from './entity/reserve.entity';
import { ReserveController } from './reserve.controller';
import { ReserveService } from './reserve.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reserve]),
    RedisModule,
    FacilityModule,
    UserModule,
    AdminModule,
  ],
  controllers: [ReserveController],
  providers: [ReserveService],
})
export class ReserveModule {}
