import { Player } from '@interfaces/players';
import { MetaData } from '@interfaces/api';

type APIResponse<T> = { data: T | T[] };
type APIResponseWithMeta<T> = APIResponse<T> & { meta: MetaData };

type PlayersAPIResponse = APIResponse<Player>;
type PlayersAPIResponseWithMeta = APIResponseWithMeta<Player>;

export type { APIResponse, APIResponseWithMeta, PlayersAPIResponse, PlayersAPIResponseWithMeta };
