import { PAGAMENTO_STATUS } from '../entity/pagamento.entity';

export type PagamentoDto = {
  pedidoId: string;
  status: string;
  messageId: string;
};
