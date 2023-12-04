import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BetDefinition, BetSchema } from './schemas/bet.schemas';
import { BetRepository } from './repositories/bet.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BetDefinition.name, schema: BetSchema },
    ]),
  ],
  providers: [BetRepository],
  controllers: [],
  exports: [BetRepository],
})
export class MongodbModule {}
