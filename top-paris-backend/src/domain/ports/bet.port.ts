import { BetEntity } from '../entities/bet.entity';
import { TopBetsEntity } from '../entities/top-bets.entity';

export interface BetPort {
  recoverTopSportBetsFromPartners(limit: number): Promise<BetEntity[]>;

  saveTopSportBets(bets: BetEntity[]): Promise<void>;

  getTopBets(page: number, limit: number): Promise<TopBetsEntity>;

  deleteTopBetsExpired(): Promise<void>;
}

export const BET_PORT = Symbol('BET_PORT');
