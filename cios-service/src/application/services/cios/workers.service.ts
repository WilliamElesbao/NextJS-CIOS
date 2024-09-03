import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/data/client/prisma.service';
import { CiosWorkers, SeniorADViewTypes } from 'src/lib/definitions';

@Injectable()
export class WorkerService {
  constructor(private readonly workerService: PrismaService) {}

  async createWorker(user: SeniorADViewTypes): Promise<{ message: string }> {
    try {
      const registration =
        user.numcad !== null ? String(user.numcad) : user.samAccountName;
      const name = user.nomfun !== null ? user.nomfun : user.displayName;
      const email = user.mail !== null ? user.mail : 'Sem email';
      const cc =
        user.codccu !== null
          ? `${user.codccu.slice(3)} - ${user.nomccu}`
          : user.department;
      const manager = user.NOMECHEFIA || user.manager.match(/CN=([^,]+)/)?.[1];
      const status = user.SITUACAO || user.ATIVO;

      await this.workerService.ciosClient.worker.create({
        data: {
          registration,
          name,
          email,
          cc,
          manager,
          status,
        },
      });

      return { message: 'Worker created' };
    } catch (error) {
      console.error('problem para criar usuario ', error);
      // console.log(
      //   'problem para criar usuario ',
      //   'nome: ',
      //   user.nomfun || user.displayName,
      //   'numcad: ',
      //   user.numcad,
      //   'numcpf: ',
      //   user.numcpf,
      //   'department: ',
      //   user.department,
      //   'NOMECHEFIA: ',
      //   user.NOMECHEFIA,
      //   'manager: ',
      //   user.manager.match(/CN=([^,]+)/)?.[1],
      //   'samAccountName: ',
      //   user.samAccountName,
      //   'mail: ',
      //   user.mail,
      //   'codccu: ',
      //   user.codccu,
      //   'nomccu: ',
      //   user.nomccu,
      //   'SITUACAO: ',
      //   user.SITUACAO,
      //   'ATIVO: ',
      //   user.ATIVO,
      // );
      return { message: error.message };
    }
  }

  async updateWorker(
    user: SeniorADViewTypes,
    matchingWorker: CiosWorkers,
  ): Promise<{ message: string }> {
    try {
      const registration =
        user.numcad !== null ? String(user.numcad) : user.samAccountName;
      const name = user.nomfun !== null ? user.nomfun : user.displayName;
      const email = user.mail !== null ? user.mail : 'Sem email';
      const cc =
        user.codccu !== null
          ? `${user.codccu.slice(3)} - ${user.nomccu}`
          : user.department;
      const manager = user.NOMECHEFIA || user.manager.match(/CN=([^,]+)/)?.[1];
      const status = user.SITUACAO || user.ATIVO;

      await this.workerService.ciosClient.worker.update({
        where: { id: matchingWorker.id },
        data: {
          registration,
          name,
          email,
          cc,
          manager,
          status,
        },
      });
      return { message: 'Worker updated' };
    } catch (error) {
      return { message: error.message };
    }
  }

  async findWorkers(): Promise<CiosWorkers[]> {
    return await this.workerService.ciosClient.worker.findMany();
  }

  async findWorkersWithoutEmail(): Promise<CiosWorkers[]> {
    return await this.workerService.ciosClient.worker.findMany({
      where: {
        OR: [{ email: null }, { email: '' }],
      },
    });
  }
}
