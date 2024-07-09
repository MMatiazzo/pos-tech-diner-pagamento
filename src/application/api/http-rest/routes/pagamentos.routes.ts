import { Body, Controller, Get, Inject, Post } from '@nestjs/common';

import { CriarPagamentoController } from '../../../../application/operation/controllers/pagamento/criar-pagamento/criar-pagamento.controller';
import { ListarPagamentoController } from '../../../../application/operation/controllers/pagamento/listar-pagamento/listar-pagamento.controller';
import { PagarPagamentoController } from '../../../../application/operation/controllers/pagamento/pagar-pagamento/pagar-pagamento.controller';
import { PagamentosDtos } from '../../../../core/pagamento/dto/cria-pagamento.dto';
import { PagarPagamentoDto } from '../../../../core/pagamento/dto/pagar-pagamento.dto';
import { Pagamento } from '../../../../core/pagamento/entity/pagamento.entity';

// deploy trigger

@Controller('/pagamento')
export class PagamentoControllerRoute {
  constructor(
    @Inject(CriarPagamentoController)
    private criarPagamentoController: CriarPagamentoController,

    @Inject(PagarPagamentoController)
    private pagarPagamentoController: PagarPagamentoController,

    @Inject(ListarPagamentoController)
    private listarPagamentoController: ListarPagamentoController,
  ) { }

  @Post('/criar-pagamentos')
  async cadastrar(@Body() payload: PagamentosDtos): Promise<Pagamento[]> {
    const pagamentoCriado = await this.criarPagamentoController.handle(payload);
    return pagamentoCriado;
  }

  @Post('/pagar')
  async pagar(@Body() payload: PagarPagamentoDto): Promise<Pagamento> {
    console.log('teste na rota de pagar', payload);
    const pagamento = await this.pagarPagamentoController.handle(payload);
    return pagamento;
  }

  @Get('/listar-pagamento')
  async listar(): Promise<Pagamento[]> {
    const pagamentos = await this.listarPagamentoController.handle();
    return pagamentos;
  }
}
