import { Model } from '@interfaces/model';

export interface Team extends Model {
  id: number;
  abbreviation: string;
  city: string;
  conference: string;
  division: string;
  full_name: string;
  name: string;
}
