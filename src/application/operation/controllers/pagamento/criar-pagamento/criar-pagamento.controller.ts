import { Inject } from '@nestjs/common';
import { PagamentoDto } from '../../../../../core/pagamento/dto/cria-pagamento.dto';
import { Pagamento } from '../../../../../core/pagamento/entity/pagamento.entity';
import { CriarPagamentoUseCase } from '../../../../../core/pagamento/usecase/criar-pagamento/criar-pagamento.usecase';

export class CriarPagamentoController {
  constructor(
    @Inject(CriarPagamentoUseCase)
    private criarPagamentoUseCase: CriarPagamentoUseCase,
  ) { }

  async handle(pagamento: PagamentoDto): Promise<Pagamento> {
    const pagamentoCriado = await this.criarPagamentoUseCase.execute(pagamento);
    return pagamentoCriado;
  }
}
