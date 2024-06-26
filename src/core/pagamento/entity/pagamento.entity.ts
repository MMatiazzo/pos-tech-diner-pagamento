import { PagamentoDto } from '../dto/cria-pagamento.dto';

export enum PAGAMENTO_STATUS {
  AGUARDANDO_PAGAMENTO = 'Aguardando_Pagamento',
  PAGAMENTO_RECUSADO = 'Pagamento_Recusado',
  PAGAMENTO_CONFIRMADO = 'Recebido',
  EM_PREPARACAO = 'Em_preparacao',
  PRONTO = 'Pronto',
  FINALIZADO = 'Finalizado',
}

export class Pagamento {
  id?: string;
  pedidoId: string;
  status: string;

  private constructor(paylod: PagamentoDto) {
    this.pedidoId = paylod._id;
    this.status = paylod.status;
  }

  public static new(payload: PagamentoDto) {
    const pagamento = new Pagamento(payload);
    return pagamento;
  }
}
