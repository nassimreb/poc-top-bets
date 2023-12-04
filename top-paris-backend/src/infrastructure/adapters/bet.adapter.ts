import { BetPort } from '../../domain/ports/bet.port';
import { BetEntity } from '../../domain/entities/bet.entity';
import { ParionsSportWebClientHttp } from '../repositories/http/clients/parions-sport-web-client.http';
import { BetMapper } from '../mappers/bet.mapper';
import { TopBetsEntity } from '../../domain/entities/top-bets.entity';
import { BetRepository } from '../repositories/db/mongodb/repositories/bet.repository';
import { Builder } from 'builder-pattern';

export class BetAdapter implements BetPort {
  constructor(
    private readonly parionsSportWebClientHttp: ParionsSportWebClientHttp,
    private readonly betRepository: BetRepository,
  ) {}

  async getTopBets(page: number, limit: number): Promise<TopBetsEntity> {
    const topBets = await this.betRepository.findTopBets(page, limit);
    return Builder<TopBetsEntity>()
      .topBets(
        topBets.bets.map((bet) => BetMapper.mapFromDocumentToBetEntity(bet)),
      )
      .total(topBets.total)
      .build();
  }

  async recoverTopSportBetsFromPartners(limit: number): Promise<BetEntity[]> {
    const topEvents = await this.parionsSportWebClientHttp.getTopEvents(limit);
    return topEvents.map((event) => BetMapper.mapFromTopSportEventToBet(event));
  }

  async saveTopSportBets(bets: BetEntity[]): Promise<void> {
    return this.betRepository.saveTopBets(bets);
  }

  async deleteTopBetsExpired(): Promise<void> {
    return this.betRepository.deleteTopBetsExpired();
  }
}
