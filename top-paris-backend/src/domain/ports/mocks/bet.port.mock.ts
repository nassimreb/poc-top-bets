import { BetPort } from '../bet.port';

export const betPortMock: BetPort = {
  getTopBets: jest.fn(),
  saveTopSportBets: jest.fn(),
  recoverTopSportBetsFromPartners: jest.fn(),
  deleteTopBetsExpired: jest.fn(),
};
