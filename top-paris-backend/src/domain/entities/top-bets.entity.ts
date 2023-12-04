import { BetEntity } from './bet.entity';

export type TopBetsEntity = {
  total: number;
  topBets: BetEntity[];
};
