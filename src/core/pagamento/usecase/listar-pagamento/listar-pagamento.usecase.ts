import { BadRequestException, Inject, Injectable } from '@nestjs/common';

import { IPagamentoGateway } from '../../../../application/operation/gateways/pagamento/Ipagamento.gateway';
import { PagamentosDtos } from '../../dto/cria-pagamento.dto';
import { Pagamento } from '../../entity/pagamento.entity';

@Injectable()
export class ListarPagamentoUseCase {
  constructor(
    @Inject(IPagamentoGateway)
    private pagamentoGateway: IPagamentoGateway,
  ) { }

  async execute(): Promise<Pagamento[]> {
    return this.pagamentoGateway.listarTodosPagamentos();
  }
}
