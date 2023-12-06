import React, { useState, useEffect } from 'react'; // TODO: add useMemo

import PlayerItem from './PlayerItem';
import SearchBar from '@components/search/SearchBar';
import Pagination from '@components/paginations/Pagination';
import BackgroundColorizer from '@components/tools/BackgroundColorizer';

import { Player } from '@interfaces/players';
import { DEFAULT_PAGE_SIZE } from '@utils/constants';
import { PlayersAPIResponseWithMeta } from '~types/api';
import { addFavorite, removeFavorite } from '@api/players';

import '@styles/players/PlayersList.css';

interface PlayersListProps {
  title: string;
  fetchPlayersByPage: (
    page?: number,
    name?: string
  ) => Promise<PlayersAPIResponseWithMeta> | PlayersAPIResponseWithMeta;
  isSearchable?: boolean;
  isBgColorModifiable?: boolean;
  pageSize?: number;
}

const PlayersList = ({
  fetchPlayersByPage,
  title,
  isSearchable = true,
  isBgColorModifiable = false,
  pageSize = DEFAULT_PAGE_SIZE
}: PlayersListProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [bgColor, setBgColor] = useState('');
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

  const onBgColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBgColor(e.target.value);
  };

  const onSearch = async () => {
    const response = await fetchPlayersByPage(currentPage, searchText);
    setPageData(response);
  };

  const onPageChange = async (page: number) => {
    setCurrentPage(page);
    const response = await fetchPlayersByPage(page, searchText);
    setPageData(response);
  };

  const handleAddFavorite = (player: Player) => {
    const response = addFavorite(player);
    setPageData(response);
  };

  const handleRemoveFavorite = async (player: Player) => {
    const response = await removeFavorite(player);
    setPageData(response);
  };

  const initialFetch = async () => {
    const response = await fetchPlayersByPage(1);
    setPageData(response);
  };

  useEffect(() => {
    initialFetch();
  }, []);

  const items = (pageData.data as Player[]).map((player: Player) => (
    <PlayerItem
      key={player.id}
      player={player}
      handleLike={player.is_liked ? handleRemoveFavorite : handleAddFavorite}
    />
  ));

  return (
    <div className='players-list' style={bgColor ? { backgroundColor: bgColor } : {}}>
      <div className='players-list__container'>
        <div className='players-list__title'>
          <h4>{title}</h4>
        </div>
        {isBgColorModifiable && <BackgroundColorizer onChange={onBgColorChange} />}
        {isSearchable && <SearchBar placeholder='Player Name' setText={setSearchText} onSearch={onSearch} />}
        <div className='players-list__list'>
          {items.length ? items : <div className='players-list__list__empty'>No players found.</div>}
        </div>
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
