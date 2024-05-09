import { BadRequestException } from '@nestjs/common';
import { IPagamentoGateway } from 'src/application/operation/gateways/pagamento/Ipagamento.gateway';
import { PagamentoDto } from '../../dto/cria-pagamento.dto';
import { Pagamento } from '../../entity/pagamento.entity';
import { CriarPagamentoUseCase } from './criar-pagamento.usecase';

const ID_UUID = "0";
const pagamentoDto: PagamentoDto = {
  "pedidoId": "123456",
  "status": "Aguardando_Pagamento",
  "messageId": "messageID1"
}

describe('CriarPagamentoUseCase', () => {
  let criaPagamentoUseCase: CriarPagamentoUseCase;
  let pagamentoGatewayMock: IPagamentoGateway;

  beforeEach(() => {
    pagamentoGatewayMock = {
      criarPagamento: jest.fn(async () => {
        return { ...pagamentoDto, id: ID_UUID }
      }),
      listarPagamento: jest.fn(async () => {
        return { ...pagamentoDto, id: ID_UUID }
      }),
      atualizarStatusPagamento: jest.fn(async () => {
        return { ...pagamentoDto, id: ID_UUID }
      })
    } as IPagamentoGateway;

    criaPagamentoUseCase = new CriarPagamentoUseCase(pagamentoGatewayMock);
  });

  it('Deve ser capaz de criar um novo pagamento', async () => {
    const mockPagamento = Pagamento.new(pagamentoDto);

    const result = await criaPagamentoUseCase.execute(pagamentoDto);

    expect(result.id).toEqual(ID_UUID);
    expect(pagamentoGatewayMock.criarPagamento).toHaveBeenNthCalledWith(1, mockPagamento);
  });

  it('Não deve ser capaz de criar um pagamento sem messageId', async () => {
    let error: Error | undefined;
    try {
      const mockPagamento = Pagamento.new({ ...pagamentoDto, messageId: "" }); // Create a mock Produto object if necessary
      await criaPagamentoUseCase.execute(mockPagamento);
    } catch (err) {
      error = err;
    }

    expect(error).toBeInstanceOf(BadRequestException);
    expect(error?.message).toBe("Id do pedido, status e messageId são obrigatórios");
  });

  it('Não deve ser capaz de criar um pagamento sem pedidoId', async () => {
    let error: Error | undefined;
    try {
      const mockPagamento = Pagamento.new({ ...pagamentoDto, pedidoId: "" }); // Create a mock Produto object if necessary
      await criaPagamentoUseCase.execute(mockPagamento);
    } catch (err) {
      error = err;
    }

    expect(error).toBeInstanceOf(BadRequestException);
    expect(error?.message).toBe("Id do pedido, status e messageId são obrigatórios");
  });

  it('Não deve ser capaz de criar um pagamento sem status', async () => {
    let error: Error | undefined;
    try {
      const mockPagamento = Pagamento.new({ ...pagamentoDto, status: "" }); // Create a mock Produto object if necessary
      await criaPagamentoUseCase.execute(mockPagamento);
    } catch (err) {
      error = err;
    }

    expect(error).toBeInstanceOf(BadRequestException);
    expect(error?.message).toBe("Id do pedido, status e messageId são obrigatórios");
  });
});
