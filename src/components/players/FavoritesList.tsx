import React from 'react';

import PlayersList from './PlayersList';
import { getPlayersByPage } from '@api/players';

const FavoritesList = () => <PlayersList title='Favorites List' fetchPlayers={getPlayersByPage} />;

export default FavoritesList;
