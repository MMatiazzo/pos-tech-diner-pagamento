import { Pagamento } from 'src/core/pagamento/entity/pagamento.entity';

export interface IPagamentoGateway {
  criarPagamento(pagamento: Pagamento): Promise<Pagamento>;
  listarPagamento(pedidoId: string): Promise<Pagamento>;
  listarTodosPagamentos(): Promise<Pagamento[]>;
  atualizarStatusPagamento(
    pedidoId: string,
    status: string,
  ): Promise<Pagamento>;
}

export const IPagamentoGateway = Symbol('IPagamentoGateway');
