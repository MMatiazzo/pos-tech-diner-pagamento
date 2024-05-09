import { BadRequestException } from '@nestjs/common';
import { IPagamentoGateway } from '../../../../application/operation/gateways/pagamento/Ipagamento.gateway';
import { PagamentoDto } from '../../dto/cria-pagamento.dto';
import { PagarPagamentoDto } from '../../dto/pagar-pagamento.dto';
import { PAGAMENTO_STATUS } from '../../entity/pagamento.entity';
import { PagarPagamentoUseCase } from './pagar-pagamento.usecase';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';

const ID_UUID = "0";
const pagamentoDto: PagamentoDto = {
    "pedidoId": "123456",
    "status": "Aguardando_Pagamento",
    "messageId": "messageID1"
}

const pagarPagamentoDto: PagarPagamentoDto = {
    "pedidoId": "123456",
    "cartao": "5031433215406351"
}

describe('PagarPagamentoUseCase', () => {
    let pagarPagamentoUseCase: PagarPagamentoUseCase;
    let pagamentoGatewayMock: IPagamentoGateway;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
              ConfigModule.forRoot({
                envFilePath: ['.development.env']
              }),
            ],
          }).compile()
        pagamentoGatewayMock = {
            criarPagamento: jest.fn(async () => {
                return { ...pagamentoDto, id: ID_UUID }
            }),
            listarPagamento: jest.fn(async (pedidoId) => {
                return pedidoId === pagamentoDto.pedidoId ? { ...pagamentoDto, id: ID_UUID }: null
            }),
            atualizarStatusPagamento: jest.fn(async (pedidoId, novoStatus) => {
                return { ...pagamentoDto, id: ID_UUID, status: novoStatus}
            })
        } as IPagamentoGateway;

        pagarPagamentoUseCase = new PagarPagamentoUseCase(pagamentoGatewayMock);
    });

    it('Deve ser capaz de pagar um pagamento', async () => {
        const result = await pagarPagamentoUseCase.execute(pagarPagamentoDto);
        expect(result.id).toEqual(ID_UUID);
        expect(result.status).toEqual(PAGAMENTO_STATUS.PAGAMENTO_CONFIRMADO)
    });

    it('Não deve ser capaz de pagar um pagamento não vinculado a um pedido', async () => {
        const result = pagarPagamentoUseCase.execute({ ...pagarPagamentoDto, pedidoId: '2222' });

        await expect(result)
            .rejects.toEqual(new BadRequestException('Pagamento não encontrado para este pedido'));
    });

    it('Não deve ser capaz de pagar um pagamento sem pedidoId ou cartao', async () => {
        const result = pagarPagamentoUseCase.execute({ ...pagarPagamentoDto, cartao: '', pedidoId: '' });

        await expect(result)
            .rejects.toEqual(new BadRequestException('Id do pedido e cartão são obrigatórios'));
    });

    it('Deve ser capaz de um pagamento ficar com status recusado com cartao um cartão inválido', async () => {
        const result = await pagarPagamentoUseCase.execute({ ...pagarPagamentoDto, cartao: '12312312312' });

        expect(result.status).toEqual(PAGAMENTO_STATUS.PAGAMENTO_RECUSADO)
    });
});
