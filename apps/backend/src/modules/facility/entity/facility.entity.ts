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
  @ApiProperty()
  @IsNumber()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @IsString()
  @Column({ nullable: false })
  name: string;

  @ApiProperty()
  @IsNumber()
  @Column({ nullable: false })
  x: number;

  @ApiProperty()
  @IsNumber()
  @Column({ nullable: false })
  y: number;

  @ApiProperty()
  @IsNumber()
  @Column({ nullable: false })
  w: number;

  @ApiProperty()
  @IsNumber()
  @Column({ nullable: false })
  h: number;

  @ApiProperty({
    enum: Model.FacilityType,
    enumName: Object.keys(Model.FacilityType)
      .map((k) => `${k}=${Model.FacilityType[k]}`)
      .join(', '),
  })
  @IsEnum(Object.values(Model.FacilityType))
  @Column({
    type: 'enum',
    enum: Object.values(Model.FacilityType),
    nullable: false,
  })
  type: Model.FacilityType;

  @ApiProperty({ type: () => Floor })
  @ManyToOne(() => Floor)
  @Type(() => Floor)
  floor: Floor;
}
