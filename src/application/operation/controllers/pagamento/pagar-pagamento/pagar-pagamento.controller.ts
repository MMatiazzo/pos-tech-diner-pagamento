import { Inject } from '@nestjs/common';
import { PagarPagamentoDto } from '../../../../../core/pagamento/dto/pagar-pagamento.dto';
import { Pagamento } from '../../../../../core/pagamento/entity/pagamento.entity';
import { PagarPagamentoUseCase } from '../../../../../core/pagamento/usecase/pagar-pagamento/pagar-pagamento.usecase';

export class PagarPagamentoController {
  constructor(
    @Inject(PagarPagamentoUseCase)
    private pagarPagamentoUseCase: PagarPagamentoUseCase,
  ) { }

  async handle(pagamento: PagarPagamentoDto): Promise<Pagamento> {
    return await this.pagarPagamentoUseCase.execute(pagamento);
  }
}
