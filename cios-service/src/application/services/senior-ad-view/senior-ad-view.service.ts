import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/data/client/prisma.service';

@Injectable()
export class SeniorAdViewService {
  constructor(private readonly seniorADViewService: PrismaService) {}

  async findSeniorAdViewUsers() {
    return await this.seniorADViewService.seniorAdViewClient.seniorADView.findMany(
      // {
      //   where: {
      //     AND: [{ SITUACAO: 'Ativo' }],
      //   },
      // },
    );
  }
}
