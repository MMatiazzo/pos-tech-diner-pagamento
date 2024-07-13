import { PagamentoDto, PagamentosDtos } from "../../../../../core/pagamento/dto/cria-pagamento.dto";
import { Pagamento } from "../../../../../core/pagamento/entity/pagamento.entity";
import { CriarPagamentoUseCase } from "../../../../../core/pagamento/usecase/criar-pagamento/criar-pagamento.usecase";
import { IPagamentoGateway } from "../../../gateways/pagamento/Ipagamento.gateway";
import { CriarPagamentoController } from "./criar-pagamento.controller";

const ID_UUID = "0";
const pagamentoDto: PagamentoDto = {
    __v: 0,
    clienteId: "test@test.com",
    createdAt: new Date().toISOString(),
    produtosIds: ["6692bcf4fca7d1902952393a"],
    updatedAt: new Date().toISOString(),
    _id: "6692bd1dfca7d1902952393e",
    status: "Aguardando_Pagamento"
}

const pagamentoObjMock: Pagamento = {
    "pedidoId": "6692bd1dfca7d1902952393e",
    "status": 'Aguardando_Pagamento'
}

const pagamentosDto: PagamentosDtos = {
    "pagamentos": [pagamentoDto]
}

describe('Criar Pagamento Controller', () => {
    let criarPagamentoController: CriarPagamentoController;
    let criarPagamentoUseCase: CriarPagamentoUseCase;
    let pagamentoGatewayMock: IPagamentoGateway;

    beforeEach(() => {
        pagamentoGatewayMock = {
            criarPagamento: jest.fn(async () => {
                return { ...pagamentoDto, id: ID_UUID, pedidoId: pagamentoDto._id }
            }),
            listarPagamento: jest.fn(async () => {
                return { ...pagamentoDto, id: ID_UUID, pedidoId: pagamentoDto._id }
            }),
            listarTodosPagamentos: jest.fn(async () => {
                return []
            }),
            atualizarStatusPagamento: jest.fn(async () => {
                return { ...pagamentoDto, id: ID_UUID, pedidoId: pagamentoDto._id }
            })
        } as IPagamentoGateway;

        criarPagamentoUseCase = new CriarPagamentoUseCase(pagamentoGatewayMock);
        criarPagamentoController = new CriarPagamentoController(criarPagamentoUseCase);
    });

    it('Deve ser capaz de criar um novo pagamento', async () => {

        const pagamentoCriado = await criarPagamentoController.handle(pagamentosDto);

        expect(pagamentoCriado[0].id).toEqual(ID_UUID);
        expect(pagamentoGatewayMock.criarPagamento).toHaveBeenNthCalledWith(1, pagamentoObjMock);
    });
});
