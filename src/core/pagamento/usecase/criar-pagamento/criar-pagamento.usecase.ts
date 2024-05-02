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
    if (!payload.pedidoId) {
      throw new BadRequestException('Id do pedido é obrigatório');
    }

    const pagamento = Pagamento.new(payload);
    pagamento.status = process.env.INITIAL_STATUS;

    const pagamentoCriado = await this.pagamentoGateway.criarPagamento(
      pagamento,
    );
    return pagamentoCriado;
  }
}
