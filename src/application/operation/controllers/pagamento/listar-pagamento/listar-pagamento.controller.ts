import { Inject } from '@nestjs/common';
import { PagarPagamentoDto } from '../../../../../core/pagamento/dto/pagar-pagamento.dto';
import { Pagamento } from '../../../../../core/pagamento/entity/pagamento.entity';
import { PagarPagamentoUseCase } from '../../../../../core/pagamento/usecase/pagar-pagamento/pagar-pagamento.usecase';
import { ListarPagamentoUseCase } from 'src/core/pagamento/usecase/listar-pagamento/listar-pagamento.usecase';

export class ListarPagamentoController {
  constructor(
    @Inject(ListarPagamentoUseCase)
    private pagarPagamentoUseCase: ListarPagamentoUseCase,
  ) { }

  async handle(): Promise<Pagamento[]> {
    return this.pagarPagamentoUseCase.execute();
  }
}
