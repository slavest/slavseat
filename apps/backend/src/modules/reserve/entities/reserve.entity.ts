import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber, IsString } from 'class-validator';
import { Seat } from 'src/modules/seat/entities/seat.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Reserve {
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

  @Column({ nullable: false })
  @IsDate()
  @ApiProperty()
  end: Date;
}
