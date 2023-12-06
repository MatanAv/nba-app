import React from 'react';

import LikeButton from '@components/buttons/LikeButton';
import { Player } from '@interfaces/players';

interface PlayerItemProps {
  player: Player;
  handleLike: (player: Player) => void;
}

const PlayerItem = ({ player, handleLike }: PlayerItemProps) => {
  const { first_name, last_name, position, team, is_liked } = player;
  const abbv = team ? `, ${team.abbreviation}` : '';

  return (
    <div className='player-item'>
      <h5>{`${first_name} ${last_name}`}</h5>
      <p>{position + abbv}</p>
      <LikeButton isLiked={is_liked} handleLike={() => handleLike(player)} />
    </div>
  );
};

export default PlayerItem;
