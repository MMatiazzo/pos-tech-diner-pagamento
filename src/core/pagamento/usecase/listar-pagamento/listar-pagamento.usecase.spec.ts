import { IPagamentoGateway } from '../../../../application/operation/gateways/pagamento/Ipagamento.gateway';
import { PagamentoDto } from '../../dto/cria-pagamento.dto';
import { Pagamento } from '../../entity/pagamento.entity';
import { ListarPagamentoUseCase } from './listar-pagamento.usecase';

const ID_UUID = "0";
const pagamentoDto: PagamentoDto = {
    "_id": "123456",
    "status": "Aguardando_Pagamento"
}

const listarPagamentos: Pagamento[] = [{
    "id": ID_UUID,
    "pedidoId": "123456",
    "status": "Aguardando_Pagamento"
}]


describe('PagarPagamentoUseCase', () => {
    let listarPagamentoUseCase: ListarPagamentoUseCase;
    let pagamentoGatewayMock: IPagamentoGateway;

    beforeEach(async () => {
        pagamentoGatewayMock = {
            criarPagamento: jest.fn(async () => {
                return { ...pagamentoDto, id: ID_UUID, pedidoId: pagamentoDto._id }
            }),
            listarPagamento: jest.fn(async (pedidoId) => {
                return pagamentoDto._id === pedidoId ? { ...pagamentoDto, id: ID_UUID, pedidoId: pagamentoDto._id } : null
            }),
            listarTodosPagamentos: jest.fn(async () => {
                return listarPagamentos
            }),
            atualizarStatusPagamento: jest.fn(async (pedidoId, novoStatus) => {
                return { ...pagamentoDto, id: ID_UUID, pedidoId, status: novoStatus }
            })
        } as IPagamentoGateway;

        listarPagamentoUseCase = new ListarPagamentoUseCase(pagamentoGatewayMock);
    });

    it('Deve ser capaz de listar todos os pagamentos', async () => {
        const result = await listarPagamentoUseCase.execute();
        expect(result.length).toEqual(1);
        expect(result[0].pedidoId).toEqual(pagamentoDto._id)
    });
});
