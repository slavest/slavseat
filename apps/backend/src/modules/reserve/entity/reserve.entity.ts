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
import { User } from 'src/modules/user/entity/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Reserve implements Model.ReserveInfoBase {
  @PrimaryGeneratedColumn()
  @IsNumber()
  @ApiProperty({ description: '예약 아이디' })
  id: number;

  @JoinColumn()
  @ManyToOne(() => User, (user) => user.id, { nullable: false })
  @Type(() => User)
  @ApiProperty({ description: '예약한 사용자' })
  user: User;

  @ManyToOne(() => Facility, (facility) => facility.id, {
    nullable: false,
  })
  @ApiProperty({ description: '예약한 시설물' })
  facility: Facility;

  @Column({ nullable: false })
  @IsDate()
  @Type(() => Date)
  @ApiProperty({ description: '예약 시작 날짜' })
  start: Date;

  @Column({ nullable: true })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  @ApiProperty({ description: '예약 종료 날짜' })
  end: Date | null;

  @Column({ nullable: false })
  @IsBoolean()
  @ApiProperty({ description: '고정 예약 여부' })
  always: boolean;

  @CreateDateColumn()
  @IsDate()
  @ApiProperty({ description: '등록 일시' })
  createdAt: Date;
}
