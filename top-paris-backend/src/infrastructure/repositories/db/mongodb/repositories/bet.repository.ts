import { Injectable } from '@nestjs/common';
import { BetDefinition } from '../schemas/bet.schemas';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class BetRepository {
  constructor(
    @InjectModel(BetDefinition.name) private betModel: Model<BetDefinition>,
  ) {}

  async findTopBets(
    skip: number,
    limit: number,
  ): Promise<{ bets: BetDefinition[]; total: number }> {
    const query = { endValidationDate: { $gt: new Date() } };
    const total = await this.betModel.countDocuments(query);

    const betsFound = await this.betModel
      .find(query)
      .skip(skip)
      .limit(limit)
      .exec();

    return { bets: betsFound, total };
  }

  async deleteTopBetsExpired(): Promise<void> {
    await this.betModel.deleteMany({ endValidationDate: { $lt: new Date() } });
  }

  async saveTopBets(bets: BetDefinition[]): Promise<void> {
    await this.betModel.insertMany(bets);
  }
}
