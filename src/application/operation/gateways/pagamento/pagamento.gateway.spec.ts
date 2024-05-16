import { Test, TestingModule } from '@nestjs/testing';
import { PagamentoGateway } from './pagamento.gateway';
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

  describe('listarPagamento', () => {
    it('Deve ser capaz de chamar a função de listar no pagamentoRepository', async () => {
      const pedidoId = '12345';
      const expectedResult: Pagamento = {pedidoId: "12345", status: ''}; 
      jest.spyOn(pagamentoRepository, 'listar').mockResolvedValue(expectedResult);

      const result = await pagamentoGateway.listarPagamento(pedidoId);

      expect(pagamentoRepository.listar).toHaveBeenCalledWith(pedidoId);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('listarTodosPagamentos', () => {
    it('Deve ser capaz de chamar a função listarTodos no pagamentoRepository', async () => {
      const expectedResult: Pagamento[] = []; 
      jest.spyOn(pagamentoRepository, 'listarTodos').mockResolvedValue(expectedResult);

      const result = await pagamentoGateway.listarTodosPagamentos();

      expect(pagamentoRepository.listarTodos).toHaveBeenCalled();
      expect(result).toEqual(expectedResult);
    });
  });
});
