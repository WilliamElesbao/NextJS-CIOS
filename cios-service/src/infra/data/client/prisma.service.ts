import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient as PrismaCIOS } from '@prisma/cios-client';
import { PrismaClient as PrismaSeniorADView } from '@prisma/senior_ad_view';

@Injectable()
export class PrismaService implements OnModuleInit {
  public ciosClient: PrismaCIOS;
  public seniorAdViewClient: PrismaSeniorADView;

  constructor() {
    this.ciosClient = new PrismaCIOS();
    this.seniorAdViewClient = new PrismaSeniorADView();
  }

  async onModuleInit() {
    await this.ciosClient.$connect();
    await this.seniorAdViewClient.$connect();
  }

  async onModuleDestroy() {
    await this.ciosClient.$disconnect();
    await this.seniorAdViewClient.$disconnect();
  }
}
