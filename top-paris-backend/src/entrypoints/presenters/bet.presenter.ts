import { ApiProperty } from '@nestjs/swagger';

export class BetPresenter {
  @ApiProperty()
  readonly id!: number;

  @ApiProperty()
  readonly description!: string;

  readonly competition!: string;
  @ApiProperty()
  readonly startDate!: Date;
  @ApiProperty()
  readonly endValidationDate!: Date;
  @ApiProperty()
  readonly sport!: string;
  @ApiProperty()
  readonly market!: Market[];
  @ApiProperty()
  readonly moreMarkets!: number;
  @ApiProperty()
  readonly label!: string;
}

class Market {
  @ApiProperty()
  readonly label!: string;
  @ApiProperty()
  readonly price!: number;
}
