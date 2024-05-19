import { BadRequestException, Inject, Injectable } from '@nestjs/common';

import { IPagamentoGateway } from '../../../../application/operation/gateways/pagamento/Ipagamento.gateway';
import { PagamentosDtos } from '../../dto/cria-pagamento.dto';
import { Pagamento } from '../../entity/pagamento.entity';

@Injectable()
export class CriarPagamentoUseCase {
  constructor(
    @Inject(IPagamentoGateway)
    private pagamentoGateway: IPagamentoGateway,
  ) { }

  async execute(payload: PagamentosDtos): Promise<Pagamento[]> {

    const pagamentos = payload.pagamentos.map(pagamento => Pagamento.new({ ...pagamento }));

    console.log('pagamentos => ', pagamentos);
    const promiseCriarPagamento = pagamentos.map(novoPagamento => this.pagamentoGateway.criarPagamento(novoPagamento));

    const pagamentosCriados = await Promise.all(promiseCriarPagamento);
    return pagamentosCriados;
  }
}
