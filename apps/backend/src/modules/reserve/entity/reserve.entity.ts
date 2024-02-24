import { ApiProperty } from '@nestjs/swagger';
import { Model } from '@slavseat/types';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { IsBoolean } from 'src/libs/decorator/isBoolean.decorator';
import { Facility } from 'src/modules/facility/entity/facility.entity';
import { Seat } from 'src/modules/seat/entity/seat.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Reserve implements Model.ReserveInfo {
  @PrimaryGeneratedColumn()
  @IsNumber()
  @ApiProperty()
  id: number;

  @Column({ nullable: false })
  @IsString()
  @ApiProperty()
  user: string;

  @ManyToOne(() => Facility, (facility) => facility.id, {
    nullable: false,
  })
  @ApiProperty()
  facility: Facility;

  @Column({ nullable: false })
  @IsDate()
  @Type(() => Date)
  @ApiProperty()
  start: Date;

  @Column({ nullable: true })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  @ApiProperty()
  end: Date | null;

  @Column({ nullable: false })
  @IsBoolean()
  @ApiProperty()
  always: boolean;
}
