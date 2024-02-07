import { ApiProperty } from '@nestjs/swagger';
import { Model } from '@slavseat/types';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Seat } from 'src/modules/seat/entity/seat.entity';
import {
  Column,
  Entity,
  OneToMany,
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

  @OneToMany(() => Seat, (seat) => seat.id)
  @ApiProperty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Seat)
  seats: Seat[];
}
