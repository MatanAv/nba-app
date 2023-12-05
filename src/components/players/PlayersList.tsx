import React, { useState, useEffect } from 'react'; // TODO: add useMemo

import SearchBar from '../search/SearchBar';
import Pagination from '../paginations/Pagination';
import PlayerItem from './PlayerItem';
import { Player } from '@interfaces/players';
import { PlayerAPIResponse } from '~types/api';

interface PlayersListProps {
  fetchPlayers: (page: number) => Promise<PlayerAPIResponse> | PlayerAPIResponse;
  title: string;
  isSearchable?: boolean;
}

const PlayersList = ({ fetchPlayers, title, isSearchable = true }: PlayersListProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageData, setPageData] = useState<PlayerAPIResponse>({
    data: [],
    meta: { per_page: 1, total_count: 0, total_pages: 1 }
  });

  // TODO: handle like
  const handleLike = (id: number | string) => {
    console.log(id);
  };

  // TODO: handle search
  const onTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value.trim();
    console.log(text);
  };

  const onPageChange = async (page: number) => {
    setCurrentPage(page);
    const response = await fetchPlayers(page);
    setPageData(response);
  };

  const items = pageData.data.map((player: Player) => (
    <PlayerItem key={player.id} playerData={player} handleLike={handleLike} />
  ));

  useEffect(() => {
    const fetch = async () => {
      const response = await fetchPlayers(0);
      setPageData(response);
    };

    fetch();
  }, []);

  return (
    <div className='players-list'>
      <h4 className='players-list__title'>{title}</h4>
      {isSearchable && <SearchBar placeholder='Player Name' onTextChange={onTextChange} />}
      <div className='players-list__list'>
        {items.length ? items : <div className='players-list__list__empty'>No players found.</div>}
        {items.length && (
          <Pagination
            currentPage={currentPage}
            pageSize={pageData.meta.per_page}
            totalItems={pageData.meta.total_count}
            totalPages={pageData.meta.total_pages}
            onPageChange={onPageChange}
          />
        )}
      </div>
    </div>
  );
};

export default PlayersList;
