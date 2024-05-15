import { Test, TestingModule } from '@nestjs/testing';
import { PagamentoControllerRoute } from './pagamentos.routes';
import { CriarPagamentoController } from '../../../../application/operation/controllers/pagamento/criar-pagamento/criar-pagamento.controller';
import { ListarPagamentoController } from '../../../../application/operation/controllers/pagamento/listar-pagamento/listar-pagamento.controller';
import { PagarPagamentoController } from '../../../../application/operation/controllers/pagamento/pagar-pagamento/pagar-pagamento.controller';
import { PagamentosDtos } from '../../../../core/pagamento/dto/cria-pagamento.dto';
import { PagarPagamentoDto } from '../../../../core/pagamento/dto/pagar-pagamento.dto';
import { Pagamento } from '../../../../core/pagamento/entity/pagamento.entity';

describe('PagamentoControllerRoute', () => {
  let controller: PagamentoControllerRoute;
  let criarPagamentoController: CriarPagamentoController;
  let pagarPagamentoController: PagarPagamentoController;
  let listarPagamentoController: ListarPagamentoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PagamentoControllerRoute],
      providers: [
        {
          provide: CriarPagamentoController,
          useValue: {
            handle: jest.fn(),
          },
        },
        {
          provide: PagarPagamentoController,
          useValue: {
            handle: jest.fn(),
          },
        },
        {
          provide: ListarPagamentoController,
          useValue: {
            handle: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<PagamentoControllerRoute>(PagamentoControllerRoute);
    criarPagamentoController = module.get<CriarPagamentoController>(CriarPagamentoController);
    pagarPagamentoController = module.get<PagarPagamentoController>(PagarPagamentoController);
    listarPagamentoController = module.get<ListarPagamentoController>(ListarPagamentoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a new pagamento', async () => {
    const mockPayload: PagamentosDtos = {pagamentos: []}; // Provide mock data as needed
    const mockResponse: Pagamento[] = []; // Provide mock response as needed

    jest.spyOn(criarPagamentoController, 'handle').mockResolvedValue(mockResponse);

    const result = await controller.cadastrar(mockPayload);

    expect(result).toEqual(mockResponse);
  });

  it('should pay for a pagamento', async () => {
    const mockPayload: PagarPagamentoDto = {cartao: '', pedidoId: ''}; // Provide mock data as needed
    const mockResponse: Pagamento = {pedidoId: '', status: ""}; // Provide mock response as needed

    jest.spyOn(pagarPagamentoController, 'handle').mockResolvedValue(mockResponse);

    const result = await controller.pagar(mockPayload);

    expect(result).toEqual(mockResponse);
  });

  it('should list pagamentos', async () => {
    const mockResponse: Pagamento[] = []; // Provide mock response as needed

    jest.spyOn(listarPagamentoController, 'handle').mockResolvedValue(mockResponse);

    const result = await controller.listar();

    expect(result).toEqual(mockResponse);
  });
});
