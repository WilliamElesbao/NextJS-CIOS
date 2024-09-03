import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { WorkerService } from 'src/application/services/cios/workers.service';
import { SeniorAdViewService } from '../senior-ad-view/senior-ad-view.service';

@Injectable()
export class JobService {
  private readonly logger = new Logger(JobService.name);
  constructor(
    private readonly ciosService: WorkerService,
    private readonly seniorAdViewService: SeniorAdViewService,
  ) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async handleCron() {
    this.logger.debug('Cron job started');
    await this.syncWorkers();
  }

  async syncWorkers(): Promise<void> {
    this.logger.debug('Synchronizing workers');
    const workers = await this.ciosService.findWorkers();
    const usersSeniorAdView =
      await this.seniorAdViewService.findSeniorAdViewUsers();

    for (const user of usersSeniorAdView) {
      const matchingWorker = workers.find(
        (worker) =>
          worker.registration === String(user.numcad) ||
          worker.registration === user.samAccountName,
      );

      if (matchingWorker) {
        const hasChanges =
          (user.numcad !== null &&
            matchingWorker.registration !== String(user.numcad)) ||
          matchingWorker.name !== user.nomfun ||
          matchingWorker.email !== user.mail ||
          matchingWorker.cc.slice(0, 4) !== user.codccu.slice(3) ||
          (user.NOMECHEFIA === null
            ? matchingWorker.manager !== user.manager.match(/CN=([^,]+)/)?.[1]
            : matchingWorker.manager !== user.NOMECHEFIA) ||
          (user.SITUACAO === null
            ? matchingWorker.status !== user.ATIVO
            : matchingWorker.status !== user.SITUACAO)
          // matchingWorker.status !== user.SITUACAO;
        if (
          hasChanges &&
          user.mail &&
          user.mail !== '' &&
          user.nroempresa === 1 // Atualiza somente usuarios da empresa 1 (TMSA)
        ) {
          try {
            await this.ciosService.updateWorker(user, matchingWorker);
            this.logger.log('Worker updated: ' + user.nomfun);
          } catch (error) {
            console.error(error);
          }
        }
      } else {

        try {
          const isThirdPartyUser =
            user.numcad === null &&
            user.numcpf === null &&
            user.department !== null &&
            user.manager !== null &&
            user.displayName !== null &&
            user.samAccountName !== null &&
            user.mail !== null &&
            user.ATIVO === 'ATIVO';

          const isFactoryUser =
            String(user.numcad) !== String(user.employeeNumber) &&
            String(user.numcpf) !== String(user.employeeID) &&
            user.SITUACAO === 'Ativo';

          const isSeniorAdUser =
            user.numcad === Number(user.employeeNumber) &&
            user.numcpf === BigInt(user.employeeID) &&
            (user.SITUACAO === 'Ativo' || user.ATIVO === 'ATIVO');

          if (isThirdPartyUser || isFactoryUser || isSeniorAdUser) {
            await this.ciosService.createWorker(user);
            this.logger.log(
              'Worker created: ' + (user.nomfun || user.displayName),
            );
          }
        } catch (error) {
          console.error(error);
        }
      }
    }
    
    // const usersWithoutEmail = await this.ciosService.findWorkersWithoutEmail();
    // let array = [];

    // usersWithoutEmail.map((user) => {
    //   array.push(user.registration);
    // });

    // console.log(array.length); // quantidade de usuários sem e-mail, provavelmente usuários de fábrica

    this.logger.log('Workers synchronized');
  }
}
