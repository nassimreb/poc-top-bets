import { BetPresenter } from './bet.presenter';
import { ApiProperty } from '@nestjs/swagger';

export class TopBetsPresenter {
  @ApiProperty({ type: BetPresenter, isArray: true })
  readonly data: BetPresenter[];
  @ApiProperty()
  readonly total: number;
  @ApiProperty()
  readonly totalPages: number;
  @ApiProperty()
  readonly page: number;
  @ApiProperty()
  readonly isLastPage: boolean;
}
