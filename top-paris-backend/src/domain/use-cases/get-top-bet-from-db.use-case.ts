import { BetPort } from '../ports/bet.port';
import { DataPaginatedEntity } from '../entities/data-paginated.entity';
import { BetEntity } from '../entities/bet.entity';
import { FailedGetTopBetsException } from '../exceptions/bet/failed-get-top-bets.exception';

export class GetTopBetFromDbUseCase {
  constructor(private readonly betPort: BetPort) {}

  async execute(
    page: number = 1,
    limit: number = 10,
  ): Promise<DataPaginatedEntity<BetEntity>> {
    const { topBets, total } = await this.betPort
      .getTopBets(page, limit)
      .catch(() => {
        throw new FailedGetTopBetsException();
      });

    const totalPages = Math.ceil(total / limit);
    const isLastPage = page >= totalPages;
    return {
      page,
      limit,
      total,
      totalPages,
      isLastPage,
      data: topBets,
    };
  }
}
