import axios from 'axios';
import Storage from '@services/storage';
import { ID } from '~types/model';
import { Player } from '@interfaces/players';
import { TableNames } from '@enums/storage';
import { markLikedPlayers } from '@utils/players';
import { getResponseWithMeta } from '@utils/api';
import { DEFAULT_PAGE_SIZE, PLAYERS_API_URL } from '@utils/constants';
import { PlayersAPIResponse, PlayersAPIResponseWithMeta } from '~types/api';

Storage.init<Player>(TableNames.PLAYERS);

const api = axios.create({
  baseURL: PLAYERS_API_URL
});

const getPlayersByPage = async (
  page: number = 1,
  name: string = '',
  pageSize: number = DEFAULT_PAGE_SIZE
): Promise<PlayersAPIResponseWithMeta> => {
  const response = await api.get(`?search=${name}&per_page=${pageSize}&page=${page}`);

  markLikedPlayers(response.data.data);

  return response.data;
};

const getPlayerById = async (id: ID): Promise<PlayersAPIResponse> => {
  const response = await api.get(`/${id}`);
  const player = response.data.data;

  player.is_liked = Storage.exists(TableNames.PLAYERS, player.id);

  return player;
};

const getFavoritesByPage = (
  page: number = 1,
  name: string = '',
  pageSize: number = DEFAULT_PAGE_SIZE
): PlayersAPIResponseWithMeta => {
  let favorites = Storage.getAll<Player>(TableNames.PLAYERS);

  if (name) {
    favorites = favorites.filter((player: Player) => {
      const fullName = `${player.first_name} ${player.last_name}`.toLowerCase();
      return fullName.includes(name.toLowerCase());
    });
  }

  return getResponseWithMeta<Player>(favorites, pageSize, page);
};

const addFavorite = (player: Player, pageSize: number = DEFAULT_PAGE_SIZE): PlayersAPIResponseWithMeta => {
  const updatedFavorites = Storage.createOne<Player>(TableNames.PLAYERS, { ...player, is_liked: true });

  return getResponseWithMeta<Player>(updatedFavorites, pageSize);
};

const removeFavorite = (player: Player, pageSize: number = DEFAULT_PAGE_SIZE): PlayersAPIResponseWithMeta => {
  const updatedFavorites = Storage.deleteOne<Player>(TableNames.PLAYERS, player.id);

  return getResponseWithMeta<Player>(updatedFavorites, pageSize);
};

export { getPlayersByPage, getPlayerById, getFavoritesByPage, addFavorite, removeFavorite };
