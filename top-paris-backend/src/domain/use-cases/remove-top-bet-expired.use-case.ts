import { BetPort } from '../ports/bet.port';
import { FailedRemoveTopBetsException } from '../exceptions/bet/failed-remove-top-bets.exception';

export class RemoveTopBetExpiredUseCase {
  constructor(readonly betPort: BetPort) {}

  async execute(): Promise<void> {
    await this.betPort.deleteTopBetsExpired().catch(() => {
      throw new FailedRemoveTopBetsException();
    });
  }
}
