import { PagamentoDto } from "../../../../../core/pagamento/dto/cria-pagamento.dto";
import { Pagamento } from "../../../../../core/pagamento/entity/pagamento.entity";
import { ListarPagamentoUseCase } from "../../../../../core/pagamento/usecase/listar-pagamento/listar-pagamento.usecase";
import { IPagamentoGateway } from "../../../gateways/pagamento/Ipagamento.gateway";
import { ListarPagamentoController } from "./listar-pagamento.controller";

const ID_UUID = "0";
const pagamentoDto: PagamentoDto = {
    __v: 0,
    clienteId: "",
    createdAt: new Date().toISOString(),
    produtosIds: ["123"],
    updatedAt: new Date().toISOString(),
    "_id": "123456",
    "status": "Aguardando_Pagamento"
}

const pagamentoObjMock: Pagamento = {
    "id": ID_UUID,
    "pedidoId": "123456",
    "status": 'Aguardando_Pagamento'
}

describe('Listar Pagamento Controller', () => {
    let listarPagamentoController: ListarPagamentoController;
    let listarPagamentoUseCase: ListarPagamentoUseCase;
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
                return [pagamentoObjMock]
            }),
            atualizarStatusPagamento: jest.fn(async () => {
                return { ...pagamentoDto, id: ID_UUID, pedidoId: pagamentoDto._id }
            })
        } as IPagamentoGateway;

        listarPagamentoUseCase = new ListarPagamentoUseCase(pagamentoGatewayMock);
        listarPagamentoController = new ListarPagamentoController(listarPagamentoUseCase);
    });

    it('Deve ser capaz de retornar pagamentos', async () => {

        const pagamentos = await listarPagamentoController.handle();

        expect(pagamentos.length).toEqual(1);
    });
});
