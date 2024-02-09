import { ApiProperty } from '@nestjs/swagger';
import { IsDate } from 'class-validator';

export class GetReserveByDateRequestDto {
  @ApiProperty()
  @IsDate()
  date: Date;
}
