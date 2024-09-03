import { Module } from '@nestjs/common';
import { WorkerService } from 'src/application/services/cios/workers.service';

@Module({
  providers: [WorkerService],
  exports: [WorkerService],
})
export class CiosModule {}
