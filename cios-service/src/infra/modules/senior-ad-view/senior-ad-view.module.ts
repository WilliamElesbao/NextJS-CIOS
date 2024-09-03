import { Module } from '@nestjs/common';
import { SeniorAdViewService } from 'src/application/services/senior-ad-view/senior-ad-view.service';

@Module({
  providers: [SeniorAdViewService],
  exports: [SeniorAdViewService],
})
export class SeniorADViewModule {}
