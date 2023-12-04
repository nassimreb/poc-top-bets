import { Module } from '@nestjs/common';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { EntryPointsModule } from './entrypoints/entry-points.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    InfrastructureModule,
    EntryPointsModule,
    MongooseModule.forRoot(process.env.DATABASE_URI),
  ],
  providers: [],
})
export class AppModule {}
