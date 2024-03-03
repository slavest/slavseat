import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class GetImageRequestDto {
  @IsNumber()
  @ApiProperty({ description: '이미지 아이디' })
  id: number;
}
