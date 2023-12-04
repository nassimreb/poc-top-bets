import { SportsEvent } from '../repositories/http/clients/models/top-events.model';
import { BetEntity } from '../../domain/entities/bet.entity';
import { BetDefinition } from '../repositories/db/mongodb/schemas/bet.schemas';

export class BetMapper {
  static mapFromTopSportEventToBet(event: SportsEvent): BetEntity {
    return {
      id: event.event.id,
      description: event.event.description,
      startDate: new Date(event.event.startDate),
      endValidationDate: new Date(event.market.endValidationDate),
      competition: event.event.competition.label,
      sport: event.event.sport.label,
      market: event.market.outcomesFull.map((market) => ({
        label: market.label,
        price: market.price,
      })),
      moreMarkets: event.market.moreMarkets,
      label: event.market.label,
    };
  }

  static mapFromDocumentToBetEntity(document: BetDefinition): BetEntity {
    return {
      id: document.id,
      description: document.description,
      startDate: document.startDate,
      endValidationDate: document.endValidationDate,
      competition: document.competition,
      sport: document.sport,
      market: document.market,
      moreMarkets: document.moreMarkets,
      label: document.label,
    };
  }
}
