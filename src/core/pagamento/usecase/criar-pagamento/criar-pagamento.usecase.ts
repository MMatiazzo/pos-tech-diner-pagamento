import { BadRequestException, Inject, Injectable } from '@nestjs/common';

import { IPagamentoGateway } from '../../../../application/operation/gateways/pagamento/Ipagamento.gateway';
import { PagamentoDto } from '../../dto/cria-pagamento.dto';
import { Pagamento } from '../../entity/pagamento.entity';

@Injectable()
export class CriarPagamentoUseCase {
  constructor(
    @Inject(IPagamentoGateway)
    private pagamentoGateway: IPagamentoGateway,
  ) { }

  async execute(payload: PagamentoDto): Promise<Pagamento> {
    if (!payload.pedidoId || !payload.status || !payload.messageId) {
      throw new BadRequestException(
        'Id do pedido, status e messageId são obrigatórios',
      );
    }

    const pagamento = Pagamento.new(payload);

    const pagamentoCriado = await this.pagamentoGateway.criarPagamento(
      pagamento,
    );
    return pagamentoCriado;
  }
}
