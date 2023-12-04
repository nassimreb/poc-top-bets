import { Module } from '@nestjs/common';
import { HttpClientsModule } from './repositories/http/http-clients.module';
import { BetAdapter } from './adapters/bet.adapter';
import { BET_PORT } from '../domain/ports/bet.port';
import { ParionsSportWebClientHttp } from './repositories/http/clients/parions-sport-web-client.http';
import { MongodbModule } from './repositories/db/mongodb/mongodb.module';
import { BetRepository } from './repositories/db/mongodb/repositories/bet.repository';

const BET_PORT_PROVIDER = {
  provide: BET_PORT,
  inject: [ParionsSportWebClientHttp, BetRepository],
  useFactory: async (
    prionsSportWebClientHttp: ParionsSportWebClientHttp,
    betRepository: BetRepository,
  ) => {
    return new BetAdapter(prionsSportWebClientHttp, betRepository);
  },
};

@Module({
  providers: [BET_PORT_PROVIDER],
  imports: [HttpClientsModule, MongodbModule],
  exports: [HttpClientsModule, BET_PORT_PROVIDER],
})
export class InfrastructureModule {}
