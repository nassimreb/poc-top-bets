import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BetDocument = HydratedDocument<BetDefinition>;

@Schema({ collection: 'bets' })
export class BetDefinition {
  @Prop({ required: true })
  id: number;
  @Prop({ required: true })
  description: string;
  @Prop({ required: true })
  competition: string;
  @Prop({ required: true })
  startDate: Date;
  @Prop({ required: true })
  endValidationDate: Date;
  @Prop({ required: true })
  sport: string;
  @Prop({ required: true })
  market: Market[];
  @Prop({ required: true })
  moreMarkets: number;
  @Prop({ required: true })
  label: string;
}

type Market = {
  label: string;
  price: number;
};

export const BetSchema = SchemaFactory.createForClass(BetDefinition);
