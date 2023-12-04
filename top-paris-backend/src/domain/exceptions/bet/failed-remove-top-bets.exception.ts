import { BaseException } from '../base.exception';

export class FailedRemoveTopBetsException extends BaseException {
  static code = 'FAILED_REMOVE_TOP_BETS';
  static message = 'Failed to remove top bets';

  constructor(message = FailedRemoveTopBetsException.message) {
    super(FailedRemoveTopBetsException.code, message);
  }
}
