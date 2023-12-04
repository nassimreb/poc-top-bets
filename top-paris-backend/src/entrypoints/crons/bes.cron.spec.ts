import { BetsCron } from './bets.cron';
import { RecoverTopBetFromPartnersAndSaveUseCase } from '../../domain/use-cases/recover-top-bet-from-partners-and-save.use-case';
import { RemoveTopBetExpiredUseCase } from '../../domain/use-cases/remove-top-bet-expired.use-case';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';

describe('BetsCron', () => {
  let betsCron: BetsCron;
  let recoverTopBetFromPartenersAndSaveUseCase: RecoverTopBetFromPartnersAndSaveUseCase;
  let deleteTopBetsExpiredUseCase: RemoveTopBetExpiredUseCase;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BetsCron,
        {
          provide: RecoverTopBetFromPartnersAndSaveUseCase,
          useFactory: () => ({
            execute: jest.fn(),
          }),
        },
        {
          provide: RemoveTopBetExpiredUseCase,
          useFactory: () => ({
            execute: jest.fn(),
          }),
        },
        {
          provide: ConfigService,
          useFactory: () => ({
            get: jest.fn(),
          }),
        },
      ],
    }).compile();

    betsCron = module.get<BetsCron>(BetsCron);
    recoverTopBetFromPartenersAndSaveUseCase =
      module.get<RecoverTopBetFromPartnersAndSaveUseCase>(
        RecoverTopBetFromPartnersAndSaveUseCase,
      );
    deleteTopBetsExpiredUseCase = module.get<RemoveTopBetExpiredUseCase>(
      RemoveTopBetExpiredUseCase,
    );
    configService = module.get<ConfigService>(ConfigService);
  });

  describe('recoverTopBetFromPartnersAndSave', () => {
    it('should execute recover top bet from partners and save use case', async () => {
      const TOP_EVENTS_LIMIT = 10;
      (configService.get as jest.Mock).mockReturnValueOnce(TOP_EVENTS_LIMIT);

      await betsCron.recoverTopBetFromPartnersAndSave();

      expect(
        recoverTopBetFromPartenersAndSaveUseCase.execute,
      ).toHaveBeenCalledTimes(1);
      expect(
        recoverTopBetFromPartenersAndSaveUseCase.execute,
      ).toHaveBeenCalledWith(TOP_EVENTS_LIMIT);
    });
  });

  describe('deleteTopBetsExpired', () => {
    it('should execute delete top bets expired use case', async () => {
      await betsCron.deleteTopBetsExpired();

      expect(deleteTopBetsExpiredUseCase.execute).toHaveBeenCalledTimes(1);
    });
  });

  describe('onModuleInit', () => {
    it('should execute recover top bet from partners and save use case', async () => {
      const TOP_EVENTS_LIMIT = 10;
      (configService.get as jest.Mock).mockReturnValueOnce(TOP_EVENTS_LIMIT);
      await betsCron.recoverTopBetFromPartnersAndSave();
      expect(
        recoverTopBetFromPartenersAndSaveUseCase.execute,
      ).toHaveBeenCalledTimes(1);
      expect(
        recoverTopBetFromPartenersAndSaveUseCase.execute,
      ).toHaveBeenCalledWith(TOP_EVENTS_LIMIT);
    });
  });
});
