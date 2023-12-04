import {Component, HostListener} from '@angular/core';
import {TopBetsService} from "../../services/top-bets.service";
import {NgForOf} from "@angular/common";
import {Bet} from "../../services/models/bet.model";
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import {BetComponent} from "../bet/bet.component";

@Component({
  selector: 'app-top-bets',
  standalone: true,
  imports: [
    InfiniteScrollModule,
    NgForOf,
    BetComponent
  ],
  providers: [TopBetsService],
  templateUrl: './top-bets.component.html',
  styleUrl: './top-bets.component.scss'
})
export class TopBetsComponent {

  bets: Bet[] = [];
  currentPage = 1;
  limit = 10;
  isLastPage = false;

  constructor(private topBetsService: TopBetsService) {
    this.loadMoreBets();
  }

  loadMoreBets() {
    this.topBetsService.getBets(this.currentPage, this.limit).subscribe(data => {
      this.bets = this.bets.concat(data.data);
      this.isLastPage = data.isLastPage;
      this.currentPage++;
    });
  }


}
