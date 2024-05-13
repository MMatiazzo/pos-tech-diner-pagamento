import { Inject } from '@nestjs/common';
import { ListarPagamentoUseCase } from '../../../../../core/pagamento/usecase/listar-pagamento/listar-pagamento.usecase';
import { Pagamento } from '../../../../../core/pagamento/entity/pagamento.entity';

export class ListarPagamentoController {
  constructor(
    @Inject(ListarPagamentoUseCase)
    private pagarPagamentoUseCase: ListarPagamentoUseCase,
  ) { }

  async handle(): Promise<Pagamento[]> {
    return this.pagarPagamentoUseCase.execute();
  }
}
