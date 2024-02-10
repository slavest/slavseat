import { ApiProperty } from '@nestjs/swagger';
import { Model } from '@slavseat/types';
import {
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { IsBoolean } from 'src/libs/decorator/isBoolean.decorator';
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

  @ManyToOne(() => Seat, (seat) => seat.id, { nullable: false })
  @ApiProperty()
  seat: Seat;

  @Column({ nullable: false })
  @IsDate()
  @ApiProperty()
  start: Date;

  @Column({ nullable: true })
  @IsDate()
  @IsOptional()
  @ApiProperty()
  end: Date | null;

  @Column({ nullable: false })
  @IsBoolean()
  @ApiProperty()
  always: boolean;
}
