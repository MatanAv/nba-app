import React from 'react';

import DivisionsLayout from '@components/layouts/DivisionsLayout';
import PlayersPool from '@components/players/PlayersPool';
import FavoritesList from '@components/players/FavoritesList';
// import PlayerProfile from '@components/players/PlayerProfile';

const Players = () => {
  return (
    <div className='players-page'>
      <h1>Welcome to favorites players manager.</h1>
      <DivisionsLayout>
        <PlayersPool />
        {/* <PlayerProfile /> */}
        <FavoritesList />
      </DivisionsLayout>
    </div>
  );
};

export default Players;
