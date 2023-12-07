import PlayersList from './PlayersList';
import { getFavoritesByPage } from '@api/players';

const FavoritesList = () => (
  <PlayersList
    key={'favorites'}
    title='Favorites List'
    isSearchable={false}
    isBgColorModifiable={true}
    fetchPlayersByPage={getFavoritesByPage}
  />
);

export default FavoritesList;
