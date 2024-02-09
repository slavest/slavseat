import { ApiProperty } from '@nestjs/swagger';
import { Model } from '@slavseat/types';
import { IsNumber, IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ObjectMeta implements Model.ObjectMetaInfo {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  @IsNumber()
  id: number;

  @Column({ nullable: false })
  @ApiProperty()
  @IsString()
  name: string;

  @Column({ nullable: false })
  @ApiProperty()
  @IsString()
  type: string;

  @Column({ nullable: false })
  @ApiProperty()
  isPublic: boolean;
}
