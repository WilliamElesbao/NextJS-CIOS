import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { DataModule } from './infra/modules/db/prisma.module';
import { JobModule } from './infra/modules/job/job.module';

@Module({
  imports: [JobModule, DataModule, ScheduleModule.forRoot()],
  controllers: [],
  providers: [],
})
export class AppModule {}
