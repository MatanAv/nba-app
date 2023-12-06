import React from 'react';

import DivisionsLayout from '@components/layouts/DivisionsLayout';
import PlayersPool from '@components/players/PlayersPool';
import FavoritesList from '@components/players/FavoritesList';
// import PlayerProfile from '@components/players/PlayerProfile';

const Players = () => {
  return (
    <div className='players-page'>
      <DivisionsLayout>
        <PlayersPool key={'players_pool'} />
        {/* <PlayerProfile /> */}
        <FavoritesList key={'fav_players'} />
      </DivisionsLayout>
    </div>
  );
};

export default Players;
