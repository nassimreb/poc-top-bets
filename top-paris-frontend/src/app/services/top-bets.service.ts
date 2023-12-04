import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {TopBets} from "./models/top-bets.model";

@Injectable({
  providedIn: 'root'
})
export class TopBetsService {
  private apiUrl = 'http://localhost:3000/top';

  constructor(private http: HttpClient) {
  }

  getBets(page: number, limit: number) {
    return this.http.get<TopBets>(`${this.apiUrl}?page=${page}&limit=${limit}`);
  }
}
