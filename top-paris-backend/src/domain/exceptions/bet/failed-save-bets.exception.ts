import { BaseException } from '../base.exception';

export class FailedSaveBetsException extends BaseException {
  static code = 'BET_FAILED_SAVE';
  static message = 'Bet failed save';

  constructor(message = FailedSaveBetsException.message) {
    super(FailedSaveBetsException.code, message);
  }
}
