import { ApiProperty } from '@nestjs/swagger';
import { Model } from '@slavseat/types';
import { IsNumber, IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
