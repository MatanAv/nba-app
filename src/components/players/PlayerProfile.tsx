import React, { useState, useEffect } from 'react';

import { ID } from '~types/model';
import { Player } from '@interfaces/players';
import { getPlayerById } from '@api/players';

import '@styles/players/PlayerProfile.css';

interface PlayerProfileProps {
  playerId?: ID | null;
}

const PlayerProfile = ({ playerId }: PlayerProfileProps) => {
  const [player, setPlayer] = useState<Player | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchPlayerData = async () => {
      if (playerId) {
        try {
          setIsLoading(true);
          const player = await getPlayerById(playerId);
          setPlayer(player);
          setIsLoading(false);
        } catch (error) {
          setError((error as Error).message);
        }
      }
    };

    if (playerId) {
      fetchPlayerData();
    }
  }, [playerId]);

  const profile = player && (
    <>
      <h2>{`${player.first_name} ${player.last_name}`}</h2>
      <div className='player-profile-info'>
        {player.team && (
          <p>
            <strong>Team:</strong> {player.team.full_name}
          </p>
        )}
        <p>
          <strong>Position:</strong> {player.position || 'unknown'}
        </p>
        <p>
          <strong>Height:</strong> {player.height_inches || 'unknown'}
        </p>
        <p>
          <strong>Weight: </strong>
          {player.weight_pounds || 'unknown'}
        </p>
        <p>
          <strong>is Favorite:</strong> {player.is_liked ? 'true' : 'false'}
        </p>
      </div>
    </>
  );

  return (
    <div className='player-profile'>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : profile ? (
        profile
      ) : (
        <p>Click on player to show profile.</p>
      )}
    </div>
  );
};

export default PlayerProfile;
