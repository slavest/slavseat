import { Model } from '@slavseat/types';

export interface GroupedData {
  [date: string]: Model.ReserveInfo[]; // date를 키로 갖는 any 타입의 배열
}
