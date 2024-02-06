import { ApiProperty } from '@nestjs/swagger';
import { IsDate } from 'class-validator';

export class GetReserveByDate {
  @ApiProperty()
  @IsDate()
  date: Date;
}
