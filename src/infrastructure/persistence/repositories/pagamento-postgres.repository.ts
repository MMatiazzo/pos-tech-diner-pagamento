import { Inject, Injectable } from '@nestjs/common';
import { Pagamento } from '../../../core/pagamento/entity/pagamento.entity';
import { PrismaService } from '../../../infrastructure/persistence/prisma/prisma.service';
import { IPagamentoRepository } from './Ipagamento.repository';
import { IQueueGateway } from '../../../application/operation/gateways/queue/Iqueue.gateway';

@Injectable()
export class PagamentoPostgresRepository implements IPagamentoRepository {
  constructor(
    @Inject(PrismaService)
    private prisma: PrismaService,
    @Inject(IQueueGateway)
    private queueGateway: IQueueGateway
  ) { }

  async listar(id: string): Promise<Pagamento> {
    return await this.prisma.pagamento.findUnique({
      where: {
        id,
      },
    });
  }

  async listarTodos(): Promise<Pagamento[]> {
    return await this.prisma.pagamento.findMany();
  }

  async editar(id: string, campo: string, valor: string): Promise<Pagamento> {

    console.log('id => ', id, 'campo => ', campo, 'valor => ', valor);

    return this.prisma.$transaction(async (prisma) => {
      const updateData = { [campo]: valor };
      const pagamentoAtt = await this.prisma.pagamento.update({
        where: {
          pedidoId: id,
        },
        data: { status: valor },
      });

      console.log('pagamentoAtt => ', pagamentoAtt);

      await this.queueGateway.enviarMensagem(
        process.env.SQS_EDITAR_STATUS_PEDIDO_QUEUE,
        {
          id: id,
          status: valor,
        }
      );

      return pagamentoAtt;
    });

  }

  async criar(pagamento: Pagamento): Promise<Pagamento> {
    console.log(pagamento)
    const novoPagamento = await this.prisma.pagamento.create({
      data: { ...pagamento },
    });
    return novoPagamento;
  }
}
