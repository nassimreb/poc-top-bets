import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { TopEventsModel } from './models/top-events.model';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ParionsSportWebClientHttp {
  constructor(
    private readonly httpService: HttpService,
    private configService: ConfigService,
  ) {}

  async getTopEvents(limit: number): Promise<TopEventsModel> {
    const PARIONS_SPORT_BASE_URL = this.configService.get(
      'PARIONS_SPORT_BASE_URL',
    );

    try {
      const { data } = await lastValueFrom(
        this.httpService.get<TopEventsModel>(
          `${PARIONS_SPORT_BASE_URL}/top-events?limit=${limit}`,
        ),
      );
      return data;
    } catch (error) {
      console.error(error);
      throw new Error('Error while getting top events');
    }
  }
}
