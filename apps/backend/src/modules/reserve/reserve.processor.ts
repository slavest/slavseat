import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { plainToInstance } from 'class-transformer';

import { AddReserveRequestDto } from './dto/request/addReserveRequest.dto';
import { ReserveService } from './reserve.service';

@Processor('reserve')
export class ReserveProcessor {
  logger = new Logger(ReserveProcessor.name);

  constructor(private readonly reserveService: ReserveService) {}

  @Process({ concurrency: 1 })
  async processAddReserve(job: Job<AddReserveRequestDto>) {
    const addReserveRequestDto = plainToInstance(
      AddReserveRequestDto,
      job.data,
    );

    return this.reserveService.addReserve(addReserveRequestDto);
  }
}
