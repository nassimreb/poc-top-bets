type MarketOutcome = {
  id: number;
  opponent: {
    label: string;
  };
  label: string;
  order: number;
  price: number;
  priceChanging: number;
  status: string;
  result: null | string;
};

type Market = {
  outcomes: MarketOutcome[];
  outcomesFull: MarketOutcome[];
  id: number;
  eventId: number;
  label: string;
  index: number;
  type: {
    id: number;
    template: number;
    orderBy: string;
    label: string;
    order: number;
    description: string;
  };
  marketTemplateOverride: number;
  order: number;
  betTypeExclusion: string;
  authorizationExclusion: string;
  variable: {
    type: string;
    label: string;
  };
  handicap: string;
  startValidationDate: string;
  endValidationDate: string;
  status: string;
  boosted: boolean;
  moreMarkets: number;
};

type Sport = {
  id: number;
  label: string;
  labelShort: string;
  order: number;
  slug: string;
  marketGroupIds: number[];
};

type Competition = {
  id: number;
  label: string;
  sportId: number;
  order: number;
  flagLabel: string;
  sportLabel: string;
};

type Event = {
  id: number;
  type: string;
  abpId: number;
  description: string;
  startDate: string;
  competition: Competition;
  sport: Sport;
  markets: Market[];
  badMarkets: any[];
  boosted: boolean;
  edito: string;
};

type SportsEvent = {
  event: Event;
  market: Market;
};

type TopEventsModel = SportsEvent[];

export type { TopEventsModel, SportsEvent };
