import { PAGAMENTO_STATUS } from '../entity/pagamento.entity';

export type PagamentoDto = {
  _id: string;
  status: string;
  produtosIds: string[];
  clienteId: string;
  createdAt: string;
  updatedAt: string;
  __v: number
};

export type PagamentosDtos = {
  pagamentos: PagamentoDto[]
}