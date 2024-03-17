import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber } from 'class-validator';

export class RemoveFacilityRequestDto {
  @ApiProperty({
    type: Number,
    isArray: true,
    description: '삭제할 시설물 아이디',
  })
  @IsArray()
  @IsNumber({}, { each: true })
  facilities: number[];
}
