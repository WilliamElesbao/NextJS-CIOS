import { Module } from '@nestjs/common';
import { JobService } from 'src/application/services/job/job.service';
import { CiosModule } from '../cios/cios.module';
import { SeniorADViewModule } from '../senior-ad-view/senior-ad-view.module';

@Module({
  imports: [CiosModule, SeniorADViewModule],
  providers: [JobService],
  exports: [JobService],
})
export class JobModule {}
