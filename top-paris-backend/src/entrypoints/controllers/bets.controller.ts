import { Controller, Get, Query, UseFilters } from '@nestjs/common';
import { TopBetsPresenter } from '../presenters/top-bets.presenter';
import { GetTopBetFromDbUseCase } from '../../domain/use-cases/get-top-bet-from-db.use-case';
import { BetPresenterMapper } from '../mappers/bet-presenter.mapper';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { QueryPaginationDto } from '../dtos/query-pagination.dto';
import { BetExceptionFilter } from '../exceptions/bet-exception.filter';

@Controller('')
@UseFilters(BetExceptionFilter)
@ApiTags('Top Bet')
export class BetsController {
  constructor(
    private readonly getTopBetFromDbUseCase: GetTopBetFromDbUseCase,
  ) {}

  @Get('top')
  @ApiOperation({ summary: 'Get All Top Bets' })
  async getTopBets(
    @Query() { page, limit }: QueryPaginationDto,
  ): Promise<TopBetsPresenter> {
    const topBets = await this.getTopBetFromDbUseCase.execute(page, limit);
    return BetPresenterMapper.toTopBetsPresenter(topBets);
  }
}
