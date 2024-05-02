import { BadRequestException, Inject, Injectable } from '@nestjs/common';

import { IPagamentoGateway } from '../../../../application/operation/gateways/pagamento/Ipagamento.gateway';
import { PagarPagamentoDto } from '../../dto/pagar-pagamento.dto';
import { Pagamento } from '../../entity/pagamento.entity';

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

    if (pagamento) {
      throw new BadRequestException(
        'Pagamento não encontrado para este pedido',
      );
    }

    let novoStatus = process.env.STATUS_REPROVADO as string;

    if (payload.cartao === process.env.CARTAO_APROVADO) {
      novoStatus = process.env.STATUS_APROVADO as string;
    }

    return await this.pagamentoGateway.atualizarStatusPagamento(
      payload.pedidoId,
      novoStatus,
    );
  }
}
