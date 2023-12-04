import { DataPaginatedEntity } from '../../domain/entities/data-paginated.entity';
import { BetPresenter } from '../presenters/bet.presenter';
import { BetEntity } from '../../domain/entities/bet.entity';
import { TopBetsPresenter } from '../presenters/top-bets.presenter';

export class BetPresenterMapper {
  static toBetPresenter(bet: BetEntity): BetPresenter {
    return {
      id: bet.id,
      description: bet.description,
      competition: bet.competition,
      startDate: bet.startDate,
      endValidationDate: bet.endValidationDate,
      sport: bet.sport,
      market: bet.market,
      moreMarkets: bet.moreMarkets,
      label: bet.label,
    };
  }

  static toTopBetsPresenter(
    topBets: DataPaginatedEntity<BetEntity>,
  ): TopBetsPresenter {
    return {
      total: topBets.total,
      totalPages: topBets.totalPages,
      page: topBets.page,
      isLastPage: topBets.isLastPage,
      data: topBets.data.map((bet) => BetPresenterMapper.toBetPresenter(bet)),
    };
  }
}
