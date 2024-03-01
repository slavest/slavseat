import { ApiProperty } from '@nestjs/swagger';
import { Model } from '@slavseat/types';
import { IsNumber, IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ObjectMeta implements Model.ObjectMetaInfo {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'Object 아이디' })
  @IsNumber()
  id: number;

  @Column({ nullable: false })
  @ApiProperty({ description: 'Object 이름' })
  @IsString()
  name: string;

  @Column({ nullable: false })
  @ApiProperty({ description: 'Object MIME 유형' })
  @IsString()
  type: string;

  @Column({ nullable: false })
  @ApiProperty({ description: '접근 제한 여부' })
  isPublic: boolean;
}
