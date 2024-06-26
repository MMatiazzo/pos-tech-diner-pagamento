import { BadRequestException, Inject, Injectable } from '@nestjs/common';

import { IPagamentoGateway } from '../../../../application/operation/gateways/pagamento/Ipagamento.gateway';
import { PagarPagamentoDto } from '../../dto/pagar-pagamento.dto';
import { PAGAMENTO_STATUS, Pagamento } from '../../entity/pagamento.entity';
import { IQueueGateway } from '../../../../application/operation/gateways/queue/Iqueue.gateway';

@Injectable()
export class PagarPagamentoUseCase {
  constructor(
    @Inject(IPagamentoGateway)
    private pagamentoGateway: IPagamentoGateway,
    @Inject(IQueueGateway)
    private queueGateway: IQueueGateway
  ) { }

  async execute(payload: PagarPagamentoDto): Promise<Pagamento> {
    if (!payload.pedidoId || !payload.cartao) {
      throw new BadRequestException('Id do pedido e cartão são obrigatórios');
    }


    const pagamento = await this.pagamentoGateway.listarPagamento(
      payload.pedidoId,
    );

    if (!pagamento) {
      throw new BadRequestException(
        'Pagamento não encontrado para este pedido',
      );
    }

    let novoStatus = PAGAMENTO_STATUS.PAGAMENTO_RECUSADO
 
    console.log('process.env.CARTAO_APROVADO => ', process.env.CARTAO_APROVADO);

    if (payload.cartao === process.env.CARTAO_APROVADO) {
      novoStatus = PAGAMENTO_STATUS.PAGAMENTO_CONFIRMADO
    }

    const pago = await this.pagamentoGateway.atualizarStatusPagamento(
      payload.pedidoId,
      novoStatus,
    );

    console.log('process.env.SQS_EDITAR_STATUS_PEDIDO_QUEUE => ', process.env.SQS_EDITAR_STATUS_PEDIDO_QUEUE);

    await this.queueGateway.enviarMensagem(
      process.env.SQS_EDITAR_STATUS_PEDIDO_QUEUE,
      {
        id: pago.pedidoId,
        status: pago.status,
      }
    );

    return pago;
  }
}
