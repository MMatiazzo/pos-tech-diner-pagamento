import { Test, TestingModule } from '@nestjs/testing';
import { PagamentoGateway } from './oagamento.gateway';
import { IPagamentoRepository } from '../../../../infrastructure/persistence/repositories/Ipagamento.repository';
import { Pagamento } from '../../../../core/pagamento/entity/pagamento.entity';

describe('PagamentoGateway', () => {
  let pagamentoGateway: PagamentoGateway;
  let pagamentoRepository: IPagamentoRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PagamentoGateway,
        {
          provide: IPagamentoRepository,
          useValue: {
            listar: jest.fn(),
            listarTodos: jest.fn(),
            editar: jest.fn(),
            criar: jest.fn(),
          },
        },
      ],
    }).compile();

    pagamentoGateway = module.get<PagamentoGateway>(PagamentoGateway);
    pagamentoRepository = module.get<IPagamentoRepository>(IPagamentoRepository);
  });

  it('should be defined', () => {
    expect(pagamentoGateway).toBeDefined();
  });

  describe('listarPagamento', () => {
    it('should call listar method of pagamentoRepository', async () => {
      const pedidoId = 'someId';
      const expectedResult: Pagamento = {pedidoId: "someId", status: ''}; // Define expected result
      jest.spyOn(pagamentoRepository, 'listar').mockResolvedValue(expectedResult);

      const result = await pagamentoGateway.listarPagamento(pedidoId);

      expect(pagamentoRepository.listar).toHaveBeenCalledWith(pedidoId);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('listarTodosPagamentos', () => {
    it('should call listarTodos method of pagamentoRepository', async () => {
      const expectedResult: Pagamento[] = []; // Define expected result
      jest.spyOn(pagamentoRepository, 'listarTodos').mockResolvedValue(expectedResult);

      const result = await pagamentoGateway.listarTodosPagamentos();

      expect(pagamentoRepository.listarTodos).toHaveBeenCalled();
      expect(result).toEqual(expectedResult);
    });
  });

  // Similar tests for other methods...

});
