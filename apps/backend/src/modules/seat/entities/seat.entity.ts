import { Model } from '@slavseat/types';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Seat implements Model.SeatInfo {
  @PrimaryColumn()
  id: number;

  @Column()
  x: number;

  @Column()
  y: number;

  @Column()
  label: string;
}
