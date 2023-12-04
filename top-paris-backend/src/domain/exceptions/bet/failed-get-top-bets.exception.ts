import { BaseException } from '../base.exception';

export class FailedGetTopBetsException extends BaseException {
  static code = 'BET_FAILED_GET';
  static message = 'Failed to get bet';

  constructor(message = FailedGetTopBetsException.message) {
    super(FailedGetTopBetsException.code, message);
  }
}
