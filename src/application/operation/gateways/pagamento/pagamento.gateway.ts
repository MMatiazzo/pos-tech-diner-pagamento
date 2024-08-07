import { Inject } from '@nestjs/common';
import { Pagamento } from '../../../../core/pagamento/entity/pagamento.entity';
import { IPagamentoRepository } from '../../../../infrastructure/persistence/repositories/Ipagamento.repository';
import { IPagamentoGateway } from './Ipagamento.gateway';

export class PagamentoGateway implements IPagamentoGateway {
  constructor(
    @Inject(IPagamentoRepository)
    private pagamentoRepository: IPagamentoRepository,
  ) { }

  async listarPagamento(pedidoId: string): Promise<Pagamento> {
    return await this.pagamentoRepository.listar(pedidoId);
  }

  async listarTodosPagamentos(): Promise<Pagamento[]> {
    return await this.pagamentoRepository.listarTodos();
  }

  async atualizarStatusPagamento(
    pedidoId: string,
    status: string,
  ): Promise<Pagamento> {
    console.log('status dentro do gateway => ', status);
    const novoStatus = await this.pagamentoRepository.editar(pedidoId, 'status', status);
    return novoStatus
  }

  async criarPagamento(pagamento: Pagamento): Promise<Pagamento> {
    const { id } = await this.pagamentoRepository.criar(pagamento);
    return {
      ...pagamento,
      id,
    };
  }
}
