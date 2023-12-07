import { ID } from '~types/model';
import { Model } from '@interfaces/model';

export interface TableData<T extends Model> {
  [key: ID]: T;
}
