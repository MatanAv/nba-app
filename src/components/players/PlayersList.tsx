import React, { useState, useEffect, useContext, useCallback, useMemo } from 'react';

import PlayerItem from './PlayerItem';
import Error from '@components/errors/Error';
import SearchBar from '@components/search/SearchBar';
import Pagination from '@components/paginations/Pagination';
import BackgroundColorizer from '@components/tools/BackgroundColorizer';

import { ID } from '~types/model';
import { ErrorType } from '~types/errors';
import { Player } from '@interfaces/players';
import { DEFAULT_PAGE_SIZE } from '@utils/constants';
import { PlayersAPIResponseWithMeta } from '~types/api';
import { addFavorite, removeFavorite } from '@api/players';
import { HasFavoritesUpdatedContext, SelectedProfileIdContext } from '@pages/Players';

import '@styles/players/PlayersList.css';

interface PlayersListProps {
  title: string;
  fetchPlayersByPage: (
    page?: number,
    name?: string,
    pageSize?: number
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
  const { setHasFavoritesUpdated } = useContext(HasFavoritesUpdatedContext)!;
  const { setSelectedProfileId } = useContext(SelectedProfileIdContext)!;

  const [error, setError] = useState<ErrorType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
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

  const onPlayerClick = useCallback(
    (id: ID) => {
      setSelectedProfileId(id);
    },
    [setSelectedProfileId]
  );

  const onBgColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBgColor(e.target.value);
  };

  const handleAddFavorite = useCallback(
    (player: Player) => {
      addFavorite(player);
      setHasFavoritesUpdated(true);
    },
    [setHasFavoritesUpdated]
  );

  const handleRemoveFavorite = useCallback(
    (player: Player) => {
      removeFavorite(player);
      setHasFavoritesUpdated(true);
    },
    [setHasFavoritesUpdated]
  );

  const fetchWithLoading = useCallback(
    async (page: number = 1, name: string = '', pageSize: number = DEFAULT_PAGE_SIZE) => {
      setIsLoading(true);

      try {
        const response = await fetchPlayersByPage(page, name, pageSize);
        setPageData(response);
      } catch (error) {
        setError(error as ErrorType);
      } finally {
        setIsLoading(false);
      }
    },
    [fetchPlayersByPage]
  );

  const onSearch = async () => await fetchWithLoading(currentPage, searchText);

  const onPageChange = async (page: number) => {
    setCurrentPage(page);
    await fetchWithLoading(page, searchText);
  };

  useEffect(() => {
    fetchWithLoading();
  }, [fetchWithLoading]);

  const items = useMemo(
    () =>
      (pageData.data as Player[]).map((player: Player) => (
        <PlayerItem
          key={player.id}
          player={player}
          onPlayerClick={onPlayerClick}
          handleLike={player.is_liked ? handleRemoveFavorite : handleAddFavorite}
        />
      )),
    [handleAddFavorite, handleRemoveFavorite, onPlayerClick, pageData.data]
  );

  const renderedList = (
    <>
      <div className='players-list__list'>
        {items.length ? (
          items
        ) : (
          <div className='players-list__list__empty'>{searchText ? 'No players found.' : 'List is empty.'}</div>
        )}
      </div>
      {items.length ? (
        <Pagination
          currentPage={currentPage}
          pageSize={pageData.meta.per_page}
          totalItems={pageData.meta.total_count}
          totalPages={pageData.meta.total_pages}
          onPageChange={onPageChange}
        />
      ) : null}
    </>
  );

  return (
    <div className='players-list' style={bgColor ? { backgroundColor: bgColor } : {}}>
      <div className='players-list__container'>
        <div className='players-list__title'>
          <h4>{title}</h4>
        </div>
        {isBgColorModifiable && <BackgroundColorizer onChange={onBgColorChange} />}
        {isSearchable && <SearchBar placeholder='Player Name' setText={setSearchText} onSearch={onSearch} />}
        {isLoading ? (
          <div className='players-list__loading'>Loading...</div>
        ) : error ? (
          <Error error={error} />
        ) : (
          renderedList
        )}
      </div>
    </div>
  );
};

export default PlayersList;
