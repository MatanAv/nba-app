import Storage from '@services/storage';
import { Player } from '@interfaces/players';
import { TableNames } from '@enums/storage';

const markLikedPlayers = (players: Player[]) => {
  players.forEach((player: Player) => (player.is_liked = Storage.exists(TableNames.PLAYERS, player.id)));
};

export { markLikedPlayers };
