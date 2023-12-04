import { GetTopBetFromDbUseCase } from './get-top-bet-from-db.use-case';
import { BetEntity } from '../entities/bet.entity';
import { betPortMock } from '../ports/mocks/bet.port.mock';
import { FailedGetTopBetsException } from '../exceptions/bet/failed-get-top-bets.exception';

describe('GetTopBetFromDbUseCase', () => {
  let getTopBetFromDbUseCase: GetTopBetFromDbUseCase;

  beforeEach(() => {
    getTopBetFromDbUseCase = new GetTopBetFromDbUseCase(betPortMock);
  });
  it('should return paginated data with empty data', async () => {
    betPortMock.getTopBets = jest
      .fn()
      .mockResolvedValue({ topBets: [], total: 0 });

    const result = await getTopBetFromDbUseCase.execute(1, 10);

    expect(result.page).toBe(1);
    expect(result.limit).toBe(10);
    expect(result.total).toBe(0);
    expect(result.totalPages).toBe(0);
    expect(result.isLastPage).toBe(true);
    expect(result.data).toEqual([]);
  });

  it('should return paginated data less than limit', async () => {
    const bets: BetEntity[] = [
      { id: 1 } as BetEntity,
      { id: 2 } as BetEntity,
      { id: 3 } as BetEntity,
      { id: 4 } as BetEntity,
      { id: 5 } as BetEntity,
    ];
    betPortMock.getTopBets = jest
      .fn()
      .mockResolvedValue({ topBets: bets, total: 5 });

    const result = await getTopBetFromDbUseCase.execute(1, 8);

    expect(result.page).toBe(1);
    expect(result.limit).toBe(8);
    expect(result.total).toBe(5);
    expect(result.totalPages).toBe(1);
    expect(result.isLastPage).toBe(true);
    expect(result.data).toEqual(bets);
  });

  it('should return paginated data same as limit', async () => {
    const bets: BetEntity[] = [
      { id: 1 } as BetEntity,
      { id: 2 } as BetEntity,
      { id: 3 } as BetEntity,
      { id: 4 } as BetEntity,
      { id: 5 } as BetEntity,
    ];
    betPortMock.getTopBets = jest
      .fn()
      .mockResolvedValue({ topBets: bets, total: 15 });

    const result = await getTopBetFromDbUseCase.execute(1, 5);

    expect(result.page).toBe(1);
    expect(result.limit).toBe(5);
    expect(result.total).toBe(15);
    expect(result.totalPages).toBe(3);
    expect(result.isLastPage).toBe(false);
    expect(result.data).toEqual(bets);
  });

  it('should throw BetFailedGetException when getTopBets throw error', async () => {
    betPortMock.getTopBets = jest.fn().mockRejectedValue(new Error());

    await expect(getTopBetFromDbUseCase.execute(1, 5)).rejects.toThrow(
      new FailedGetTopBetsException(),
    );
  });
});
