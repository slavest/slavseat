import { ApiProperty } from '@nestjs/swagger';
import { Model } from '@slavseat/types';
import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsString } from 'class-validator';
import { Floor } from 'src/modules/floor/entity/floor.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Facility implements Model.FacilityInfo {
  @ApiProperty({ title: '시설물 아이디' })
  @IsNumber()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ title: '시설물 이름' })
  @IsString()
  @Column({ nullable: false })
  name: string;

  @ApiProperty({ title: '그리드 평면에서의 x 좌표' })
  @IsNumber()
  @Column({ nullable: false })
  x: number;

  @ApiProperty({ title: '그리드 평면에서의 y 좌표' })
  @IsNumber()
  @Column({ nullable: false })
  y: number;

  @ApiProperty({ title: '그리드 평면에서의 가로 넓이' })
  @IsNumber()
  @Column({ nullable: false })
  w: number;

  @ApiProperty({ title: '그리드 평면에서의 세로 높이' })
  @IsNumber()
  @Column({ nullable: false })
  h: number;

  @ApiProperty({
    enum: Model.FacilityType,
    enumName: Object.keys(Model.FacilityType)
      .map((k) => `${k}=${Model.FacilityType[k]}`)
      .join(', '),
    title: '시설물 유형',
  })
  @IsEnum(Object.values(Model.FacilityType))
  @Column({ nullable: false })
  type: Model.FacilityType;

  @ApiProperty({
    type: () => Floor,
    title: '시설물이 있는 층 정보',
  })
  @ManyToOne(() => Floor)
  @Type(() => Floor)
  floor: Floor;
}
