import { TeamDataType } from './teams';

type PlayerItemDataType = {
  id: string;
  first_name: string;
  last_name: string;
  position: string;
  team: TeamDataType;
  isLiked?: boolean;
};

// type PlayerData = {};

export type { PlayerItemDataType };
