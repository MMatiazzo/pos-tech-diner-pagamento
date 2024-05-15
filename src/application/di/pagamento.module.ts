import { Module } from '@nestjs/common';
import { Provider } from '@nestjs/common/interfaces/modules/provider.interface';
import { PrismaService } from 'src/infrastructure/persistence/prisma/prisma.service';

import { IPagamentoRepository } from 'src/infrastructure/persistence/repositories/Ipagamento.repository';
import { PagamentoPostgresRepository } from 'src/infrastructure/persistence/repositories/pagamento-postgres.repository';

import { CriarPagamentoUseCase } from 'src/core/pagamento/usecase/criar-pagamento/criar-pagamento.usecase';
import { CriarPagamentoController } from '../operation/controllers/pagamento/criar-pagamento/criar-pagamento.controller';
import { PagamentoControllerRoute } from '../api/http-rest/routes/pagamentos.routes';
import { PagarPagamentoUseCase } from 'src/core/pagamento/usecase/pagar-pagamento/pagar-pagamento.usecase';
import { PagarPagamentoController } from '../operation/controllers/pagamento/pagar-pagamento/pagar-pagamento.controller';
import { ListarPagamentoUseCase } from 'src/core/pagamento/usecase/listar-pagamento/listar-pagamento.usecase';
import { ListarPagamentoController } from '../operation/controllers/pagamento/listar-pagamento/listar-pagamento.controller';
import { IQueueGateway } from '../operation/gateways/queue/Iqueue.gateway';
import { SQSQueueGateway } from '../operation/gateways/queue/aws-queue/sqs-queue.gateway';
import { IPagamentoGateway } from '../operation/gateways/pagamento/Ipagamento.gateway';
import { PagamentoGateway } from '../operation/gateways/pagamento/oagamento.gateway';

const persistenceProviders: Provider[] = [
  PrismaService,
  {
    provide: IPagamentoRepository,
    useFactory: (prisma: PrismaService) =>
      new PagamentoPostgresRepository(prisma),
    inject: [PrismaService],
  },
  {
    provide: IPagamentoGateway,
    useFactory: (pagamentoRepository: IPagamentoRepository) =>
      new PagamentoGateway(pagamentoRepository),
    inject: [IPagamentoRepository],
  },
  {
    provide: IQueueGateway,
    useFactory: () => new SQSQueueGateway(),
    inject: []
  }
];

const useCaseProviders: Provider[] = [
  {
    provide: CriarPagamentoUseCase,
    useFactory: (pagamentoGateway: IPagamentoGateway) =>
      new CriarPagamentoUseCase(pagamentoGateway),
    inject: [IPagamentoGateway],
  },
  {
    provide: PagarPagamentoUseCase,
    useFactory: (pagamentoGateway: IPagamentoGateway, queueGateway: IQueueGateway) =>
      new PagarPagamentoUseCase(pagamentoGateway, queueGateway),
    inject: [IPagamentoGateway, IQueueGateway],
  },
  {
    provide: ListarPagamentoUseCase,
    useFactory: (pagamentoGateway: IPagamentoGateway) =>
      new ListarPagamentoUseCase(pagamentoGateway),
    inject: [IPagamentoGateway],
  },
];

const controllerProviders: Provider[] = [
  {
    provide: CriarPagamentoController,
    useFactory: (criarPagamentoUseCase: CriarPagamentoUseCase) =>
      new CriarPagamentoController(criarPagamentoUseCase),
    inject: [CriarPagamentoUseCase],
  },
  {
    provide: PagarPagamentoController,
    useFactory: (pagarPagamentoUseCase: PagarPagamentoUseCase) =>
      new PagarPagamentoController(pagarPagamentoUseCase),
    inject: [PagarPagamentoUseCase],
  },
  {
    provide: ListarPagamentoController,
    useFactory: (listarPagamentoUseCase: ListarPagamentoUseCase) =>
      new ListarPagamentoController(listarPagamentoUseCase),
    inject: [ListarPagamentoUseCase],
  },
];

@Module({
  imports: [],
  controllers: [PagamentoControllerRoute],
  providers: [
    ...persistenceProviders,
    ...useCaseProviders,
    ...controllerProviders,
  ],
})
export class PagamentoModule { }
