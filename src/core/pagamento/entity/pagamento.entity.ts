import { PagamentoDto } from '../dto/cria-pagamento.dto';

export class Pagamento {
  id?: string;
  pedidoId: string;
  status?: string;

  private constructor(paylod: PagamentoDto) {
    this.pedidoId = paylod.pedidoId;
  }

  public static new(payload: PagamentoDto) {
    const pagamento = new Pagamento(payload);
    return pagamento;
  }
}
