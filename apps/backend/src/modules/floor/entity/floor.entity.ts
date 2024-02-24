import { ApiProperty } from '@nestjs/swagger';
import { Model } from '@slavseat/types';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Facility } from 'src/modules/facility/entity/facility.entity';
import { ObjectMeta } from 'src/modules/object-storage/entity/objectMeta.entity';
import { Seat } from 'src/modules/seat/entity/seat.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Floor implements Model.FloorInfo {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  @IsNumber()
  id: number;

  @Column({ nullable: false })
  @ApiProperty()
  @IsString()
  name: string;

  @OneToMany(() => Facility, (facility) => facility.floor)
  @ApiProperty({ type: () => Facility, isArray: true })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Facility)
  facilities: Facility[];

  @JoinColumn()
  @OneToOne(() => ObjectMeta, { nullable: true })
  @ApiProperty({ type: ObjectMeta, nullable: true })
  @Type(() => ObjectMeta)
  image: ObjectMeta;
}
