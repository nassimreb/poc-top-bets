import { RemoveTopBetExpiredUseCase } from './remove-top-bet-expired.use-case';
import { betPortMock } from '../ports/mocks/bet.port.mock';
import { FailedRemoveTopBetsException } from '../exceptions/bet/failed-remove-top-bets.exception';

describe('RemoveTopBetExpiredUseCase', () => {
  let removeTopBetExpiredUseCase: RemoveTopBetExpiredUseCase;

  beforeEach(() => {
    removeTopBetExpiredUseCase = new RemoveTopBetExpiredUseCase(betPortMock);
  });
  it('should call deleteTopBetsExpired', async () => {
    (betPortMock.deleteTopBetsExpired as jest.Mock).mockResolvedValueOnce(
      Promise.resolve(),
    );
    await removeTopBetExpiredUseCase.execute();

    expect(betPortMock.deleteTopBetsExpired).toHaveBeenCalledTimes(1);
  });

  it('should throw FailedRemoveTopBetsException', async () => {
    (betPortMock.deleteTopBetsExpired as jest.Mock).mockRejectedValueOnce(
      new Error(),
    );

    await expect(removeTopBetExpiredUseCase.execute()).rejects.toThrow(
      new FailedRemoveTopBetsException(),
    );
  });
});
