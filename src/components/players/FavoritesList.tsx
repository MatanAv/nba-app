import React from 'react';

import PlayersList from './PlayersList';
import { getFavoritesByPage } from '@api/players';

const FavoritesList = () => <PlayersList key={'favorites'} title='Favorites List' fetchPage={getFavoritesByPage} />;

export default FavoritesList;
