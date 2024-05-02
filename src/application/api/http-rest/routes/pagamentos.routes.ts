import { Body, Controller, Inject, Post } from '@nestjs/common';

import { CriarPagamentoController } from 'src/application/operation/controllers/pagamento/criar-pagamento/criar-pagamento.controller';
import { PagarPagamentoController } from 'src/application/operation/controllers/pagamento/pagar-pagamento/pagar-pagamento.controller';
import { PagamentoDto } from 'src/core/pagamento/dto/cria-pagamento.dto';
import { PagarPagamentoDto } from 'src/core/pagamento/dto/pagar-pagamento.dto';
import { Pagamento } from 'src/core/pagamento/entity/pagamento.entity';

@Controller('/pagamento')
export class PagamentoControllerRoute {
  constructor(
    @Inject(CriarPagamentoController)
    private criarPagamentoController: CriarPagamentoController,

    @Inject(PagarPagamentoController)
    private pagarPagamentoController: PagarPagamentoController,
  ) { }

  @Post('/criar')
  async cadastrar(@Body() payload: PagamentoDto): Promise<Pagamento> {
    const pagamentoCriado = await this.criarPagamentoController.handle(payload);
    return pagamentoCriado;
  }

  @Post('/pagar')
  async pagar(@Body() payload: PagarPagamentoDto): Promise<Pagamento> {
    const pagamento = await this.pagarPagamentoController.handle(payload);
    return pagamento;
  }
}
