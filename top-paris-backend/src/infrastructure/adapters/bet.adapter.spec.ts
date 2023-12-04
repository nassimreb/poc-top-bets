import { BetAdapter } from './bet.adapter';
import { ParionsSportWebClientHttp } from '../repositories/http/clients/parions-sport-web-client.http';
import { BetRepository } from '../repositories/db/mongodb/repositories/bet.repository';

describe('BetAdapter', () => {
  let betAdapter: BetAdapter;
  let parionsSportWebClientHttp: ParionsSportWebClientHttp;
  let betRepository: BetRepository;

  beforeEach(() => {
    parionsSportWebClientHttp = {
      getTopEvents: jest.fn(),
    } as unknown as ParionsSportWebClientHttp;
    betRepository = {
      findTopBets: jest.fn(),
      saveTopBets: jest.fn(),
      deleteTopBetsExpired: jest.fn(),
    } as unknown as BetRepository;

    betAdapter = new BetAdapter(parionsSportWebClientHttp, betRepository);
  });

  it('should be defined', () => {
    expect(betAdapter).toBeDefined();
  });

  describe('getTopBets', () => {
    it('should call repository findTopBets', async () => {
      const page = 1;
      const limit = 10;
      const topBets = {
        bets: [],
        total: 0,
      };

      jest.spyOn(betRepository, 'findTopBets').mockResolvedValueOnce(topBets);

      const result = await betAdapter.getTopBets(page, limit);

      expect(betRepository.findTopBets).toHaveBeenCalledTimes(1);
      expect(betRepository.findTopBets).toHaveBeenCalledWith(page, limit);
      expect(result).toEqual({
        topBets: [],
        total: 0,
      });
    });
  });

  describe('recoverTopSportBetsFromPartners', () => {
    it('should call parionsSportWebClientHttp getTopEvents', async () => {
      const limit = 10;
      const topEvents = [];

      jest
        .spyOn(parionsSportWebClientHttp, 'getTopEvents')
        .mockResolvedValueOnce(topEvents);

      const result = await betAdapter.recoverTopSportBetsFromPartners(limit);

      expect(parionsSportWebClientHttp.getTopEvents).toHaveBeenCalledTimes(1);
      expect(parionsSportWebClientHttp.getTopEvents).toHaveBeenCalledWith(
        limit,
      );
      expect(result).toEqual([]);
    });
  });

  describe('saveTopSportBets', () => {
    it('should call repository saveTopBets', async () => {
      const bets = [];

      jest.spyOn(betRepository, 'saveTopBets').mockResolvedValueOnce();

      await betAdapter.saveTopSportBets(bets);

      expect(betRepository.saveTopBets).toHaveBeenCalledTimes(1);
      expect(betRepository.saveTopBets).toHaveBeenCalledWith(bets);
    });
  });

  describe('deleteTopBetsExpired', () => {
    it('should call repository deleteTopBetsExpired', async () => {
      jest.spyOn(betRepository, 'deleteTopBetsExpired').mockResolvedValueOnce();

      await betAdapter.deleteTopBetsExpired();

      expect(betRepository.deleteTopBetsExpired).toHaveBeenCalledTimes(1);
    });
  });
});
