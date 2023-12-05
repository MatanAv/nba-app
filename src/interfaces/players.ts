import { Team } from './teams';

export interface Player {
  id: string;
  first_name: string;
  last_name: string;
  position: string;
  team?: Team;
  height_feet?: number | null;
  height_inches?: number | null;
  weight_pounds?: number | null;
  is_liked?: boolean;
}
