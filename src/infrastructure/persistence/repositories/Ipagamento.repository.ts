import { Pagamento } from 'src/core/pagamento/entity/pagamento.entity';

export interface IPagamentoRepository {
  criar(pagamento: Pagamento): Promise<Pagamento>;
  listar(id: string): Promise<Pagamento | null>;
  editar(id: string, campo: string, valor: string): Promise<Pagamento>;
  listarTodos(): Promise<Pagamento[]>;
}

export const IPagamentoRepository = Symbol('IPagamentoRepository');
