import { BadRequestException, Inject, Injectable } from '@nestjs/common';

import { IPagamentoGateway } from '../../../../application/operation/gateways/pagamento/Ipagamento.gateway';
import { PagarPagamentoDto } from '../../dto/pagar-pagamento.dto';
import { PAGAMENTO_STATUS, Pagamento } from '../../entity/pagamento.entity';

@Injectable()
export class PagarPagamentoUseCase {
  constructor(
    @Inject(IPagamentoGateway)
    private pagamentoGateway: IPagamentoGateway,
  ) { }

  async execute(payload: PagarPagamentoDto): Promise<Pagamento> {
    if (!payload.pedidoId || !payload.cartao) {
      throw new BadRequestException('Id do pedido e cartão são obrigatórios');
    }


    const pagamento = await this.pagamentoGateway.listarPagamento(
      payload.pedidoId,
    );

    console.log('pagamento => ', pagamento);

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

    console.log('pagamento.pedidoId => ', pagamento.pedidoId);

    const pago = await this.pagamentoGateway.atualizarStatusPagamento(
      pagamento.pedidoId,
      novoStatus,
    );

    return pago;
  }
}
