import { ApiProperty } from '@nestjs/swagger';
import { Model } from '@slavseat/types';
import { IsNumber, IsString } from 'class-validator';
import { Floor } from 'src/modules/floor/entity/floor.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Seat implements Model.SeatInfo {
  @PrimaryGeneratedColumn()
  @IsNumber()
  @ApiProperty()
  id: number;

  @Column({ nullable: false })
  @IsNumber()
  @ApiProperty()
  x: number;

  @Column({ nullable: false })
  @IsNumber()
  @ApiProperty()
  y: number;

  @Column({ nullable: false })
  @IsString()
  @ApiProperty()
  label: string;

  @ManyToOne(() => Floor, (floor) => floor.seats, { nullable: false })
  floor: Floor;
}
