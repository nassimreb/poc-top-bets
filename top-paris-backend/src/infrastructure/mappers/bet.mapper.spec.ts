import { BetMapper } from './bet.mapper';
import { SportsEvent } from '../repositories/http/clients/models/top-events.model';
import { BetDocument } from '../repositories/db/mongodb/schemas/bet.schemas';

describe('BetMapper', () => {
  describe('mapFromTopSportEventToBet', () => {
    it('should map from top sport event to bet', () => {
      const event = {
        event: {
          id: '1',
          description: 'Arsenal - Chelsea',
          startDate: '2021-01-01T00:00:00.000Z',
          competition: {
            label: 'Premier League',
          },
          sport: {
            label: 'football',
          },
        },
        market: {
          endValidationDate: '2021-01-01T01:00:00.000Z',
          outcomesFull: [
            {
              label: '1',
              price: 1,
            },
          ],
          moreMarkets: '210',
          label: '1/N/2',
        },
      } as unknown as SportsEvent;

      const result = BetMapper.mapFromTopSportEventToBet(event);

      expect(result).toEqual({
        id: '1',
        description: 'Arsenal - Chelsea',
        startDate: new Date('2021-01-01T00:00:00.000Z'),
        endValidationDate: new Date('2021-01-01T01:00:00.000Z'),
        competition: 'Premier League',
        sport: 'football',
        market: [
          {
            label: '1',
            price: 1,
          },
        ],
        moreMarkets: '210',
        label: '1/N/2',
      });
    });
  });

  describe('mapFromDocumentToBetEntity', () => {
    it('should map from document to bet entity', () => {
      const document = {
        id: '1',
        description: 'Arsenal - Chelsea',
        startDate: new Date('2021-01-01T00:00:00.000Z'),
        endValidationDate: new Date('2021-01-01T01:00:00.000Z'),
        competition: 'Premier League',
        sport: 'football',
        market: [
          {
            label: '2',
            price: 1,
          },
        ],
        moreMarkets: '81',
        label: '1/N/2',
      } as unknown as BetDocument;

      const result = BetMapper.mapFromDocumentToBetEntity(document);

      expect(result).toEqual({
        id: '1',
        description: 'Arsenal - Chelsea',
        startDate: new Date('2021-01-01T00:00:00.000Z'),
        endValidationDate: new Date('2021-01-01T01:00:00.000Z'),
        competition: 'Premier League',
        sport: 'football',
        market: [
          {
            label: '2',
            price: 1,
          },
        ],
        moreMarkets: '81',
        label: '1/N/2',
      });
    });
  });
});
