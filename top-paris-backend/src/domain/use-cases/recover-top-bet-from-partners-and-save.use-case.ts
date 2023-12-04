import { BetPort } from '../ports/bet.port';
import { FailedToResponseFromBetPartnersException } from '../exceptions/bet/failed-to-response-from-bet-partners.exception';
import { FailedSaveBetsException } from '../exceptions/bet/failed-save-bets.exception';

export class RecoverTopBetFromPartnersAndSaveUseCase {
  constructor(readonly betPort: BetPort) {}

  async execute(limit: number): Promise<void> {
    const topBets = await this.betPort
      .recoverTopSportBetsFromPartners(limit)
      .catch(() => {
        throw new FailedToResponseFromBetPartnersException();
      });

    await this.betPort.saveTopSportBets(topBets).catch(() => {
      throw new FailedSaveBetsException();
    });
  }
}
