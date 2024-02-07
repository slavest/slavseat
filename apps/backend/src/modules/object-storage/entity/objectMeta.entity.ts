import { ApiProperty } from '@nestjs/swagger';
import { Model } from '@slavseat/types';
import {
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class ObjectMeta {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({ nullable: false })
  @ApiProperty()
  name: string;

  @Column({ nullable: false })
  @ApiProperty()
  type: string;

  @Column({ nullable: false })
  @ApiProperty()
  isPublic: boolean;
}
