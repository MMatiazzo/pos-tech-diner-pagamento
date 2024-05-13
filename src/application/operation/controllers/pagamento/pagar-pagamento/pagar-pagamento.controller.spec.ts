import { ConfigModule } from "@nestjs/config";
import { PagamentoDto } from "../../../../../core/pagamento/dto/cria-pagamento.dto";
import { PagarPagamentoDto } from "../../../../../core/pagamento/dto/pagar-pagamento.dto";
import { PAGAMENTO_STATUS } from "../../../../../core/pagamento/entity/pagamento.entity";
import { PagarPagamentoUseCase } from "../../../../../core/pagamento/usecase/pagar-pagamento/pagar-pagamento.usecase";
import { IPagamentoGateway } from "../../../gateways/pagamento/Ipagamento.gateway";
import { IQueueGateway } from "../../../gateways/queue/Iqueue.gateway";
import { PagarPagamentoController } from "./pagar-pagamento.controller";
import { Test, TestingModule } from '@nestjs/testing';

const ID_UUID = "0";
const pagamentoDto: PagamentoDto = {
    "_id": "123456",
    "status": "Aguardando_Pagamento"
}

const pagarPagamentoDto: PagarPagamentoDto = {
    "pedidoId": "123456",
    "cartao": "123"
}


describe('Pagar Pagamento Controller', () => {
    
    let pagarPagamentoController: PagarPagamentoController;
    let pagarPagamentoUseCase: PagarPagamentoUseCase;
    let pagamentoGatewayMock: IPagamentoGateway;
    let queueGatewayMock: IQueueGateway;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                ConfigModule.forRoot(),
            ],
        }).compile()
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
            atualizarStatusPagamento: jest.fn(async (pedidoId, novoStatus) => {
                return { ...pagamentoDto, id: ID_UUID, pedidoId, status: novoStatus }
            })
        } as IPagamentoGateway;

        queueGatewayMock = {
            enviarMensagem: jest.fn(async () => {
                return
            }),
            receberMensagem: jest.fn(async () => {
                return
            }),
            deletarMensagem: jest.fn(async () => {
                return
            })
        } as IQueueGateway;

        pagarPagamentoUseCase = new PagarPagamentoUseCase(pagamentoGatewayMock, queueGatewayMock);
        pagarPagamentoController = new PagarPagamentoController(pagarPagamentoUseCase);
    });

    it('Deve ser capaz de pagar um pagamento', async () => {

        const pagamentoCriado = await pagarPagamentoController.handle(pagarPagamentoDto);

        expect(pagamentoCriado.id).toEqual(ID_UUID);
        expect(pagamentoCriado.status).toEqual(PAGAMENTO_STATUS.PAGAMENTO_CONFIRMADO);
    });
});
