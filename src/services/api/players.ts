import axios from 'axios';

const api = axios.create({
  baseURL: 'https://www.balldontlie.io/api/v1/players'
});

// const getAllPlayers = async () => (await api.get('/')).data;

const getPlayersByPage = async (page: number) => (await api.get(`?page=${page}`)).data;

const getPlayersByName = async (name: string) => (await api.get(`?search=${name}`)).data;

const getPlayerById = async (id: number) => (await api.get(`/${id}`)).data;

export { getPlayersByPage, getPlayersByName, getPlayerById };
