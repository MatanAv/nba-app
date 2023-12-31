import PlayersList from './PlayersList';
import { getPlayersByPage } from '@api/players';

const PlayersPool = () => (
  <PlayersList key={'pool'} title='Players Pool' isSearchable={true} fetchPlayersByPage={getPlayersByPage} />
);

export default PlayersPool;
