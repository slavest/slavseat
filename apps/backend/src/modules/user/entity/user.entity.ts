import { ApiProperty } from '@nestjs/swagger';
import { Model } from '@slavseat/types';
import { Type } from 'class-transformer';
import { IsDate, IsNumber, IsString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User implements Model.UserInfo {
  @PrimaryGeneratedColumn()
  @IsNumber()
  @ApiProperty({ description: '유저 아이디' })
  id: number;

  @Column({ nullable: false })
  @IsString()
  @ApiProperty({ description: '유저명' })
  name: string;

  @Column({ nullable: false })
  @IsString()
  @ApiProperty({ description: '이메일' })
  email: string;

  @Column({ nullable: false })
  @IsString()
  @ApiProperty({ description: 'OAuth Provider의 ID' })
  providerId: string;

  @CreateDateColumn()
  @IsDate()
  @Type(() => Date)
  @ApiProperty({ description: '계정 생성일자' })
  createdAt: Date;
}
