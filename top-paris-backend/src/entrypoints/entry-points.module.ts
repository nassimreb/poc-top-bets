import { Module } from '@nestjs/common';
import { BetsController } from './controllers/bets.controller';
import { RecoverTopBetFromPartnersAndSaveUseCase } from '../domain/use-cases/recover-top-bet-from-partners-and-save.use-case';
import { BET_PORT, BetPort } from '../domain/ports/bet.port';
import { ScheduleModule } from '@nestjs/schedule';
import { GetTopBetFromDbUseCase } from '../domain/use-cases/get-top-bet-from-db.use-case';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';
import { BetsCron } from './crons/bets.cron';
import { RemoveTopBetExpiredUseCase } from '../domain/use-cases/remove-top-bet-expired.use-case';

@Module({
  providers: [
    {
      provide: RecoverTopBetFromPartnersAndSaveUseCase,
      inject: [BET_PORT],
      useFactory: async (betPort: BetPort) => {
        return new RecoverTopBetFromPartnersAndSaveUseCase(betPort);
      },
    },
    {
      provide: GetTopBetFromDbUseCase,
      inject: [BET_PORT],
      useFactory: async (betPort: BetPort) => {
        return new GetTopBetFromDbUseCase(betPort);
      },
    },
    {
      provide: RemoveTopBetExpiredUseCase,
      inject: [BET_PORT],
      useFactory: async (betPort: BetPort) => {
        return new RemoveTopBetExpiredUseCase(betPort);
      },
    },
    BetsCron,
  ],
  imports: [ScheduleModule.forRoot(), InfrastructureModule],
  exports: [],
  controllers: [BetsController],
})
export class EntryPointsModule {}
