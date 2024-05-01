import { ApiProperty } from '@nestjs/swagger';
import { Model } from '@slavseat/types';
import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsNumber, IsString, ValidateNested } from 'class-validator';
import { Facility } from 'src/modules/facility/entity/facility.entity';
import { ObjectMeta } from 'src/modules/object-storage/entity/objectMeta.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Floor implements Model.FloorInfo {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: '층 아이디' })
  @IsNumber()
  id: number;

  @Column({ nullable: false })
  @ApiProperty({ description: '층 이름' })
  @IsString()
  name: string;

  @OneToMany(() => Facility, (facility) => facility.floor)
  @ApiProperty({
    type: () => Facility,
    isArray: true,
    description: '층에 포함된 시설물 정보',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Facility)
  facilities: Facility[];

  @JoinColumn()
  @OneToOne(() => ObjectMeta, { nullable: true })
  @ApiProperty({
    type: ObjectMeta,
    nullable: true,
    description: '층 이미지 정보',
  })
  @Type(() => ObjectMeta)
  image: ObjectMeta;

  @Column({ nullable: false })
  @ApiProperty({ description: '배치 순서' })
  @IsNumber()
  order: number;

  @Column({ nullable: false })
  @ApiProperty({ description: '비활성화 여부' })
  @IsBoolean()
  disabled: boolean;
}
