import { Global, Module } from '@nestjs/common';
import { PrismaService } from '../../data/client/prisma.service';

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class DataModule {}
