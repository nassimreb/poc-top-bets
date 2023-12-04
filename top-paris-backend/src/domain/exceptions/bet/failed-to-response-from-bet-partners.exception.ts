import { BaseException } from '../base.exception';

export class FailedToResponseFromBetPartnersException extends BaseException {
  static code = 'BET_PARTNERS_NOT_RESPOND';
  static message = 'Failed to receive a response from bet partners';

  constructor(message = FailedToResponseFromBetPartnersException.message) {
    super(FailedToResponseFromBetPartnersException.code, message);
  }
}
