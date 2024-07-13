import { BadRequestException, Inject } from '@nestjs/common';
import { PagamentosDtos } from '../../../../../core/pagamento/dto/cria-pagamento.dto';
import { Pagamento, PAGAMENTO_STATUS } from '../../../../../core/pagamento/entity/pagamento.entity';
import { CriarPagamentoUseCase } from '../../../../../core/pagamento/usecase/criar-pagamento/criar-pagamento.usecase';

export class CriarPagamentoController {
  constructor(
    @Inject(CriarPagamentoUseCase)
    private criarPagamentoUseCase: CriarPagamentoUseCase,
  ) { }

  private isUUID(str: string) {
    const uuidRegex = /^[0-9a-fA-F]{24}$/;

    return uuidRegex.test(str);
  }

  private isValidEmail(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailRegex.test(email);
  }

  private isValidISODate(dateString: string) {
    const parsedDate = Date.parse(dateString);

    return !isNaN(parsedDate);
  }

  async handle(pagamentos: PagamentosDtos): Promise<Pagamento[]> {

    for (const pagamento of pagamentos.pagamentos) {
      if (!this.isUUID(pagamento._id)) throw new BadRequestException('Wrong format')

      const statusType = Object.values(PAGAMENTO_STATUS)
      console.log(statusType)
      console.log(pagamento.status)
      if (!statusType.includes(pagamento.status as any)) throw new BadRequestException('Wrong format')

      for (const pid of pagamento.produtosIds) {
        if (!this.isUUID(pid)) throw new BadRequestException('Wrong format')
      }

      if (!this.isValidEmail(pagamento.clienteId)) throw new BadRequestException('Wrong format')

      if (!this.isValidISODate(pagamento.createdAt) || !this.isValidISODate(pagamento.updatedAt)) throw new BadRequestException('Wrong format')
    }

    console.log('pagamentos on controller => ', pagamentos);

    const pagamentoCriado = await this.criarPagamentoUseCase.execute(pagamentos);


    return pagamentoCriado;
  }
}
