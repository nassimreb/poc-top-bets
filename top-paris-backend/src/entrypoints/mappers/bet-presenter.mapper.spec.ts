import { BetEntity } from '../../domain/entities/bet.entity';
import { BetPresenterMapper } from './bet-presenter.mapper';
import { DataPaginatedEntity } from '../../domain/entities/data-paginated.entity';

describe('BetPresenterMapper', () => {
  describe('toBetPresenter', () => {
    it('should map bet entity to bet presenter', () => {
      const betEntity: BetEntity = {
        id: 1,
        description: 'Arsenal vs Chelsea',
        competition: 'Premier League',
        startDate: new Date('2021-01-01T00:00:00.000Z'),
        endValidationDate: new Date('2021-01-01T00:00:00.000Z'),
        sport: 'football',
        market: [{ label: '2', price: 1.3 }],
        moreMarkets: 21,
        label: '1/N/2',
      };

      const result = BetPresenterMapper.toBetPresenter(betEntity);

      expect(result).toEqual({
        id: 1,
        description: 'Arsenal vs Chelsea',
        competition: 'Premier League',
        startDate: betEntity.startDate,
        endValidationDate: betEntity.endValidationDate,
        sport: 'football',
        market: [{ label: '2', price: 1.3 }],
        moreMarkets: 21,
        label: '1/N/2',
      });
    });
  });

  describe('toTopBetsPresenter', () => {
    it('should map data paginated entity of bet entity to top bets presenter', () => {
      const betEntity: BetEntity = {
        id: 1,
        description: 'Arsenal vs Chelsea',
        competition: 'Premier League',
        startDate: new Date('2021-01-01T00:00:00.000Z'),
        endValidationDate: new Date('2021-01-01T00:00:00.000Z'),
        sport: 'football',
        market: [{ label: '2', price: 1.3 }],
        moreMarkets: 21,
        label: '1/N/2',
      };
      const dataPaginatedEntity: DataPaginatedEntity<BetEntity> = {
        total: 1,
        limit: 10,
        totalPages: 1,
        page: 1,
        isLastPage: true,
        data: [betEntity],
      };

      const result = BetPresenterMapper.toTopBetsPresenter(dataPaginatedEntity);

      expect(result).toEqual({
        total: 1,
        totalPages: 1,
        page: 1,
        isLastPage: true,
        data: [
          {
            id: 1,
            description: 'Arsenal vs Chelsea',
            competition: 'Premier League',
            startDate: new Date('2021-01-01T00:00:00.000Z'),
            endValidationDate: new Date('2021-01-01T00:00:00.000Z'),
            sport: 'football',
            market: [{ label: '2', price: 1.3 }],
            moreMarkets: 21,
            label: '1/N/2',
          },
        ],
      });
    });
  });
});
