import React from 'react';

import PlayersList from './PlayersList';
import { getPlayersByPage } from '@api/players';

const PlayersPool = () => (
  <PlayersList key={'pool'} title='Players Pool' isSearchable={true} fetchPage={getPlayersByPage} />
);

export default PlayersPool;
