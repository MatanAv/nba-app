import React, { useState, useEffect, createContext } from 'react';

import DivisionsLayout from '@components/layouts/DivisionsLayout';
import PlayersPool from '@components/players/PlayersPool';
import FavoritesList from '@components/players/FavoritesList';
import PlayerProfile from '@components/players/PlayerProfile';

import { ID } from '~types/model';

type selectedProfileIdContextType = {
  selectedProfileId: ID | null;
  setSelectedProfileId: React.Dispatch<React.SetStateAction<ID | null>>;
} | null;

type HasFavoritesUpdatedContextType = {
  hasFavoritesUpdated: boolean;
  setHasFavoritesUpdated: React.Dispatch<React.SetStateAction<boolean>>;
} | null;

export const SelectedProfileIdContext = createContext<selectedProfileIdContextType>(null);
export const HasFavoritesUpdatedContext = createContext<HasFavoritesUpdatedContextType>(null);

const Players = () => {
  const [selectedProfileId, setSelectedProfileId] = useState<ID | null>(null);
  const [hasFavoritesUpdated, setHasFavoritesUpdated] = useState<boolean>(false);

  useEffect(() => {
    if (hasFavoritesUpdated) {
      setHasFavoritesUpdated(false);
    }
  }, [hasFavoritesUpdated]);

  return (
    <div className='players-page'>
      <HasFavoritesUpdatedContext.Provider value={{ hasFavoritesUpdated, setHasFavoritesUpdated }}>
        <SelectedProfileIdContext.Provider value={{ selectedProfileId, setSelectedProfileId }}>
          <DivisionsLayout>
            {!hasFavoritesUpdated && <PlayersPool key={'players_pool'} />}
            <PlayerProfile playerId={selectedProfileId} />
            {!hasFavoritesUpdated && <FavoritesList key={'fav_players'} />}
          </DivisionsLayout>
        </SelectedProfileIdContext.Provider>
      </HasFavoritesUpdatedContext.Provider>
    </div>
  );
};

export default Players;
