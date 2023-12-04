import { RecoverTopBetFromPartnersAndSaveUseCase } from './recover-top-bet-from-partners-and-save.use-case';
import { BetEntity } from '../entities/bet.entity';
import { betPortMock } from '../ports/mocks/bet.port.mock';
import { FailedToResponseFromBetPartnersException } from '../exceptions/bet/failed-to-response-from-bet-partners.exception';
import { FailedSaveBetsException } from '../exceptions/bet/failed-save-bets.exception';

describe('RecoverTopBetFromPartnersAndSaveUseCase', () => {
  let recoverTopBetFromPartnersAndSaveUseCase: RecoverTopBetFromPartnersAndSaveUseCase;

  beforeEach(() => {
    recoverTopBetFromPartnersAndSaveUseCase =
      new RecoverTopBetFromPartnersAndSaveUseCase(betPortMock);
  });
  it('should call recoverTopSportBetsFromPartners and saveTopSportBets', async () => {
    const bets: BetEntity[] = [
      { id: 1 } as BetEntity,
      { id: 2 } as BetEntity,
      { id: 3 } as BetEntity,
      { id: 4 } as BetEntity,
      { id: 5 } as BetEntity,
    ];
    betPortMock.recoverTopSportBetsFromPartners = jest
      .fn()
      .mockResolvedValue(bets);
    betPortMock.saveTopSportBets = jest.fn().mockResolvedValue(bets);
    await recoverTopBetFromPartnersAndSaveUseCase.execute(5);

    expect(betPortMock.recoverTopSportBetsFromPartners).toHaveBeenCalledTimes(
      1,
    );
    expect(betPortMock.recoverTopSportBetsFromPartners).toHaveBeenCalledWith(5);
    expect(betPortMock.saveTopSportBets).toHaveBeenCalledTimes(1);
    expect(betPortMock.saveTopSportBets).toHaveBeenCalledWith(bets);
  });

  it('should throw BetPartnersFailedToResponseException when recoverTopSportBetsFromPartners throws', async () => {
    betPortMock.recoverTopSportBetsFromPartners = jest
      .fn()
      .mockRejectedValue(new Error());
    betPortMock.saveTopSportBets = jest.fn().mockResolvedValue([]);

    await expect(
      recoverTopBetFromPartnersAndSaveUseCase.execute(5),
    ).rejects.toThrow(new FailedToResponseFromBetPartnersException());
  });

  it('should throw BetFailedSaveException when saveTopSportBets throws', async () => {
    betPortMock.recoverTopSportBetsFromPartners = jest
      .fn()
      .mockResolvedValue([]);
    betPortMock.saveTopSportBets = jest.fn().mockRejectedValue(new Error());

    await expect(
      recoverTopBetFromPartnersAndSaveUseCase.execute(5),
    ).rejects.toThrow(new FailedSaveBetsException());
  });
});
