import React from 'react';

import LikeButton from '@components/buttons/LikeButton';
import { Player } from '@interfaces/players';

interface PlayerItemProps {
  playerData: Player;
  handleLike: (id: number | string) => void;
}

const PlayerItem = ({ playerData, handleLike }: PlayerItemProps) => {
  const { id, first_name, last_name, position, team, is_liked } = playerData;
  const abbv = team && team.abbreviation;

  return (
    <div className='player-item'>
      <h5>{`${first_name} ${last_name}`}</h5>
      <p>
        {position}
        {abbv && `, ${abbv}`}
      </p>
      <LikeButton isLiked={is_liked} handleLike={() => handleLike(id)} />
    </div>
  );
};

export default PlayerItem;
