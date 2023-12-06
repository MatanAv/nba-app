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

const getPlayersByPage = async (page: number): Promise<PlayersAPIResponseWithMeta> => {
  const response = await api.get(`?page=${page}`);

  markLikedPlayers(response.data.data);

  return response.data;
};

const getPlayersByName = async (name: string): Promise<PlayersAPIResponseWithMeta> => {
  const response = await api.get(`?search=${name}`);

  markLikedPlayers(response.data.data);

  return response.data;
};

const getPlayerById = async (id: ID): Promise<PlayersAPIResponse> => {
  const response = await api.get(`/${id}`); // TODO: handle error
  const player = response.data.data;

  player.is_liked = Storage.exists(TableNames.PLAYERS, player.id);

  return player;
};

const getFavoritesByPage = (page: number): PlayersAPIResponseWithMeta => {
  const favorites = Storage.getAll<Player>(TableNames.PLAYERS);

  return getResponseWithMeta<Player>(favorites, DEFAULT_PAGE_SIZE, page);
};

const addFavorite = (player: Player): PlayersAPIResponseWithMeta => {
  const updatedFavorites = Storage.createOne<Player>(TableNames.PLAYERS, { ...player, is_liked: true });

  return getResponseWithMeta<Player>(updatedFavorites, DEFAULT_PAGE_SIZE);
};

const removeFavorite = (player: Player): PlayersAPIResponseWithMeta => {
  const updatedFavorites = Storage.deleteOne<Player>(TableNames.PLAYERS, player.id);

  return getResponseWithMeta<Player>(updatedFavorites, DEFAULT_PAGE_SIZE);
};

export { getPlayersByPage, getPlayersByName, getPlayerById, getFavoritesByPage, addFavorite, removeFavorite };
