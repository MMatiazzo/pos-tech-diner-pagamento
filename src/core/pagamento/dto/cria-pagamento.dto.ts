import { PAGAMENTO_STATUS } from '../entity/pagamento.entity';

export type PagamentoDto = {
  _id: string;
  status: string;
};

export type PagamentosDtos = {
  pagamentos: PagamentoDto[]
}