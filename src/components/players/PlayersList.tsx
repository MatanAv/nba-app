import React from 'react';

import SearchBar from '../search/SearchBar';
import Pagination from '../paginations/Pagination';
import PlayerItem from './PlayerItem';

interface PlayersListProps {
  title: string;
  players: object[];
  isSearchable?: boolean;
}

const PlayersList = ({ title, players, isSearchable = true }: PlayersListProps) => {
  const items = players.map((player) => <PlayerItem key={player.id} player={player} />);

  const onTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;
    console.log(text);
  };

  return (
    <div className='players-list'>
      <h2 className='players-list__title'>{title}</h2>
      {isSearchable && <SearchBar placeholder='Player Name' onTextChange={onTextChange} />}
      <div className='players-list__list'>
        {items.length ? items : <div className='players-list__list__empty'>No players found.</div>}
        <Pagination currentPage={} pageSize={} totalPages={} onPageChange={} />
      </div>
    </div>
  );
};

export default PlayersList;
