import React from 'react';

interface PlayerProfileProps {
  playerId?: number;
}

const PlayerProfile = ({ playerId }: PlayerProfileProps) => {
  return (
    <div className='player-profile'>
      {playerId ? <h2>Player Profile</h2> : <span>Click on player to show player data.</span>}
    </div>
  );
};

export default PlayerProfile;
