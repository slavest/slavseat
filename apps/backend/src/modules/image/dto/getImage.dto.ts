import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class GetImageParamDto {
  @IsNumber()
  @ApiProperty({ description: '이미지 아이디' })
  imageId: number;
}
