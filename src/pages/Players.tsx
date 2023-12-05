import React from 'react';

import DivisionsLayout from '@components/layouts/DivisionsLayout';
import PlayersList from '@components/players/PlayersList';
// import PlayerProfile from '@components/players/PlayerProfile';

const Players = () => {
  return (
    <div className='players-page'>
      <h1>Welcome to favorites players manager.</h1>
      <DivisionsLayout>
        <PlayersList key='pool' title='Players Pool' players={[]} />
        {/* <PlayerProfile /> */}
        <PlayersList key='favorites' title='Favorites Players' players={[]} />
      </DivisionsLayout>
    </div>
  );
};

export default Players;
