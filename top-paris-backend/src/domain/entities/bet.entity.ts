export type BetEntity = {
  id: number;
  description: string;
  competition: string;
  startDate: Date;
  endValidationDate: Date;
  sport: string;
  market: Market[];
  moreMarkets: number;
  label: string;
};
type Market = {
  label: string;
  price: number;
};
