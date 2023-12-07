import LikeButton from '@components/buttons/LikeButton';
import { Player } from '@interfaces/players';

import '@styles/players/PlayerItem.css';

interface PlayerItemProps {
  player: Player;
  onPlayerClick: (id: number | string) => void;
  handleLike: (player: Player) => void;
}

const PlayerItem = ({ player, onPlayerClick, handleLike }: PlayerItemProps) => {
  const { id, first_name, last_name, position, team, is_liked } = player;
  const abbv = team && team.abbreviation;

  return (
    <div className='player-item'>
      <div className='player-info__text'>
        <div className='player-info__header' onClick={() => onPlayerClick(id)}>
          <h5>{`${first_name} ${last_name}`}</h5>
        </div>
        <div className='player-info__sub-header'>
          <h6>{abbv + (position && `, ${position}`)}</h6>
        </div>
      </div>
      <div className='like-button-container'>
        <LikeButton isLiked={is_liked} handleLike={() => handleLike(player)} />
      </div>
    </div>
  );
};

export default PlayerItem;
