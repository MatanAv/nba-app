import React, { useState, useEffect } from 'react'; // TODO: add useMemo

import SearchBar from '../search/SearchBar';
import Pagination from '../paginations/Pagination';
import PlayerItem from './PlayerItem';

import { Player } from '@interfaces/players';
import { DEFAULT_PAGE_SIZE } from '@utils/constants';
import { PlayersAPIResponseWithMeta } from '~types/api';
import { addFavorite, removeFavorite } from '@api/players';

interface PlayersListProps {
  title: string;
  fetchPage: (page: number) => Promise<PlayersAPIResponseWithMeta> | PlayersAPIResponseWithMeta;
  isSearchable?: boolean;
  pageSize?: number;
}

const PlayersList = ({ fetchPage, title, isSearchable = true, pageSize = DEFAULT_PAGE_SIZE }: PlayersListProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageData, setPageData] = useState<PlayersAPIResponseWithMeta>({
    data: [],
    meta: {
      total_pages: 0,
      current_page: 1,
      next_page: null,
      per_page: pageSize,
      total_count: 0
    }
  });

  // TODO: handle search
  const onTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value.trim();
    console.log(text);
  };

  const onPageChange = async (page: number) => {
    setCurrentPage(page);
    const response = await fetchPage(page);
    setPageData(response);
  };

  const items = (pageData.data as Player[]).map((player: Player) => (
    <PlayerItem key={player.id} player={player} handleLike={player.is_liked ? removeFavorite : addFavorite} />
  ));

  useEffect(() => {
    const fetch = async () => {
      const response = await fetchPage(0);
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
