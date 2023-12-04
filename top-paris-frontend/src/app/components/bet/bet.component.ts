import {Component, Input} from '@angular/core';
import {Bet} from "../../services/models/bet.model";
import {DatePipe, NgForOf} from "@angular/common";

@Component({
  selector: 'app-bet',
  standalone: true,
  imports: [
    DatePipe,
    NgForOf
  ],
  templateUrl: './bet.component.html',
  styleUrl: './bet.component.scss'
})
export class BetComponent {
  @Input() bet: Bet | undefined;
}
