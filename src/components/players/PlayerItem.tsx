import React from 'react';

import LikeButton from '@components/buttons/LikeButton';
import { PlayerItemDataType } from '~types/players';

interface PlayerItemProps {
  playerData: PlayerItemDataType;
  handleLike: (id: number | string) => void;
}

const PlayerItem = ({ playerData, handleLike }: PlayerItemProps) => {
  const { id, first_name, last_name, team, isLiked } = playerData;

  return (
    <div className='player-item'>
      <h5>{`${first_name} ${last_name}`}</h5>
      <p>{team.abbreviation}</p>
      <button onClick={() => handleLike(id)}>
        <LikeButton isLiked={isLiked} handleLike={() => handleLike(id)} />
      </button>
    </div>
  );
};

export default PlayerItem;
