import axios, { AxiosError } from 'axios';
import Storage from '@services/storage';
import HttpError from '@services/http-errors';
import { StatusCodes } from 'http-status-codes';

import { ID } from '~types/model';
import { Player } from '@interfaces/players';
import { ERRORS } from '@enums/errors';
import { TableNames } from '@enums/storage';
import { markLikedPlayers } from '@utils/players';
import { getResponseWithMeta } from '@utils/api';
import { DEFAULT_PAGE_SIZE, PLAYERS_API_URL } from '@utils/constants';
import { PlayersAPIResponseWithMeta } from '~types/api';

Storage.init<Player>(TableNames.FAVORITES);

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

const getPlayerById = async (id: ID): Promise<Player> => {
  try {
    return Storage.getOne<Player>(TableNames.FAVORITES, id) || (await api.get(`/${id}`)).data;
  } catch (error) {
    if ((error as TypeError).message === ERRORS.NOT_FOUND) {
      throw new HttpError('Player not found', StatusCodes.NOT_FOUND);
    }

    throw new HttpError((error as AxiosError).message, Number((error as AxiosError).response?.status));
  }
};

const getFavoritesByPage = (
  page: number = 1,
  name: string = '',
  pageSize: number = DEFAULT_PAGE_SIZE
): PlayersAPIResponseWithMeta => {
  let favorites = Storage.getAll<Player>(TableNames.FAVORITES);

  if (name) {
    favorites = favorites.filter((player: Player) => {
      const fullName = `${player.first_name} ${player.last_name}`.toLowerCase();
      return fullName.includes(name.toLowerCase());
    });
  }

  return getResponseWithMeta<Player>(favorites, pageSize, page);
};

const addFavorite = (player: Player): void => {
  try {
    Storage.createOne<Player>(TableNames.FAVORITES, { ...player, is_liked: true });
  } catch (error) {
    if ((error as TypeError).message === ERRORS.ALREADY_EXIST) {
      throw new HttpError('Player already exist', StatusCodes.BAD_REQUEST);
    }

    throw new HttpError(ERRORS.INTERNAL_SERVER_ERROR, StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

const removeFavorite = (player: Player): void => {
  try {
    Storage.deleteOne<Player>(TableNames.FAVORITES, player.id);
  } catch (error) {
    if ((error as TypeError).message === ERRORS.NOT_FOUND) {
      throw new HttpError('Player not found', StatusCodes.NOT_FOUND);
    }

    throw new HttpError(ERRORS.INTERNAL_SERVER_ERROR, StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

export { getPlayersByPage, getPlayerById, getFavoritesByPage, addFavorite, removeFavorite };
