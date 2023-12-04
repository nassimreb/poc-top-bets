import {Bet} from "./bet.model";

export interface TopBets {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  isLastPage: boolean;
  data: Bet[];
}
