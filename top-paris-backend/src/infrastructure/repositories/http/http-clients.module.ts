import { Module } from '@nestjs/common';
import { ParionsSportWebClientHttp } from './clients/parions-sport-web-client.http';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [ParionsSportWebClientHttp],
  exports: [ParionsSportWebClientHttp],
})
export class HttpClientsModule {}
