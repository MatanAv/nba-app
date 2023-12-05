import { Player } from '@interfaces/players';
import { MetaData } from '@interfaces/api';

type PlayerAPIResponse = {
  data: Player[];
  meta: MetaData;
};

export type { PlayerAPIResponse };
