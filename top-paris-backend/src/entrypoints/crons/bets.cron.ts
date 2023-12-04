import { Injectable, OnModuleInit } from '@nestjs/common';
import { RecoverTopBetFromPartnersAndSaveUseCase } from '../../domain/use-cases/recover-top-bet-from-partners-and-save.use-case';
import { Cron, CronExpression } from '@nestjs/schedule';
import { RemoveTopBetExpiredUseCase } from '../../domain/use-cases/remove-top-bet-expired.use-case';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class BetsCron implements OnModuleInit {
  private topEventsLimit: number;

  constructor(
    private readonly recoverTopBetFromPartenersAndSaveUseCase: RecoverTopBetFromPartnersAndSaveUseCase,
    private readonly deleteTopBetsExpiredUseCase: RemoveTopBetExpiredUseCase,
    private readonly configService: ConfigService,
  ) {}

  @Cron(CronExpression.EVERY_2_HOURS)
  async recoverTopBetFromPartnersAndSave() {
    await this.recoverTopBetFromPartenersAndSaveUseCase.execute(
      this.topEventsLimit,
    );
  }

  @Cron(CronExpression.EVERY_6_HOURS)
  async deleteTopBetsExpired() {
    await this.deleteTopBetsExpiredUseCase.execute();
  }

  async onModuleInit() {
    this.topEventsLimit = this.configService.get<number>('TOP_EVENTS_LIMIT');

    await this.recoverTopBetFromPartenersAndSaveUseCase.execute(
      this.topEventsLimit,
    );
  }
}
