import { IPagamentoGateway } from 'src/application/operation/gateways/pagamento/Ipagamento.gateway';
import { PagamentoDto, PagamentosDtos } from '../../dto/cria-pagamento.dto';
import { Pagamento } from '../../entity/pagamento.entity';
import { CriarPagamentoUseCase } from './criar-pagamento.usecase';

const ID_UUID = "0";
const pagamentoDto: PagamentoDto = {
  "_id": "123456",
  "status": "Aguardando_Pagamento"
}

const pagamentosDto: PagamentosDtos = {
  "pagamentos": [pagamentoDto]
}

describe('CriarPagamentoUseCase', () => {
  let criaPagamentoUseCase: CriarPagamentoUseCase;
  let pagamentoGatewayMock: IPagamentoGateway;

  beforeEach(() => {
    pagamentoGatewayMock = {
      criarPagamento: jest.fn(async () => {
        return { ...pagamentoDto, id: ID_UUID, pedidoId: pagamentoDto._id }
      }),
      listarPagamento: jest.fn(async () => {
        return { ...pagamentoDto, id: ID_UUID, pedidoId: pagamentoDto._id }
      }),
      listarTodosPagamentos: jest.fn(async() => {
        return []
      }),
      atualizarStatusPagamento: jest.fn(async () => {
        return { ...pagamentoDto, id: ID_UUID, pedidoId: pagamentoDto._id }
      })
    } as IPagamentoGateway;

    criaPagamentoUseCase = new CriarPagamentoUseCase(pagamentoGatewayMock);
  });

  it('Deve ser capaz de criar um novo pagamento', async () => {
    const mockPagamento = Pagamento.new(pagamentoDto);

    const result = await criaPagamentoUseCase.execute(pagamentosDto);

    expect(result[0].pedidoId).toEqual(pagamentoDto._id);
    expect(pagamentoGatewayMock.criarPagamento).toHaveBeenNthCalledWith(1, mockPagamento);
  });
});
