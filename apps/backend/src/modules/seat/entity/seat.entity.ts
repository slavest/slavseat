import { ApiProperty } from '@nestjs/swagger';
import { Model } from '@slavseat/types';
import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';
import { Facility } from 'src/modules/facility/entity/facility.entity';
import { Floor } from 'src/modules/floor/entity/floor.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Seat {
  @PrimaryGeneratedColumn()
  @IsNumber()
  @ApiProperty()
  id: number;

  @ApiProperty({ type: Floor })
  @ManyToOne(() => Floor, { nullable: false })
  @Type(() => Floor)
  floor: Floor;

  @ApiProperty({ type: Facility })
  @JoinColumn()
  @OneToOne(() => Facility, { nullable: false })
  @Type(() => Facility)
  gridObject: Facility;
}
