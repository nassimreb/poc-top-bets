import { GetTopBetFromDbUseCase } from '../../domain/use-cases/get-top-bet-from-db.use-case';
import { BetsController } from './bets.controller';
import { betPortMock } from '../../domain/ports/mocks/bet.port.mock';
import { DataPaginatedEntity } from '../../domain/entities/data-paginated.entity';
import { BetEntity } from '../../domain/entities/bet.entity';

describe('BetsController', () => {
  let betsController: BetsController;
  let getTopBetFromDbUseCase: GetTopBetFromDbUseCase;

  beforeEach(async () => {
    getTopBetFromDbUseCase = new GetTopBetFromDbUseCase(betPortMock);

    betsController = new BetsController(getTopBetFromDbUseCase);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getTopBets', () => {
    it('should call use case execute', async () => {
      const limit = 10;
      const page = 1;

      const executeSpy = jest
        .spyOn(getTopBetFromDbUseCase, 'execute')
        .mockResolvedValueOnce({
          page: 1,
          limit: 10,
          total: 20,
          totalPages: 2,
          isLastPage: false,
          data: [],
        } as DataPaginatedEntity<BetEntity>);

      await expect(
        betsController.getTopBets({ page, limit }),
      ).resolves.toStrictEqual({
        data: [],
        isLastPage: false,
        page: 1,
        total: 20,
        totalPages: 2,
      });

      expect(executeSpy).toHaveBeenCalledTimes(1);
      expect(executeSpy).toHaveBeenCalledWith(page, limit);
    });
  });
});
