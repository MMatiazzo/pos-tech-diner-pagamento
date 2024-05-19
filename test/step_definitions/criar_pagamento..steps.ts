import { Given, Then, When } from '@cucumber/cucumber';
import * as assert from 'assert';
import { CriarPagamentoController } from '../../src/application/operation/controllers/pagamento/criar-pagamento/criar-pagamento.controller';
import { IPagamentoGateway } from '../../src/application/operation/gateways/pagamento/Ipagamento.gateway';
import { PagamentoDto, PagamentosDtos } from '../../src/core/pagamento/dto/cria-pagamento.dto';
import { Pagamento } from '../../src/core/pagamento/entity/pagamento.entity';
import { CriarPagamentoUseCase } from '../../src/core/pagamento/usecase/criar-pagamento/criar-pagamento.usecase';

let pagamentoGateway: IPagamentoGateway;
let criarPagamentoUseCase: CriarPagamentoUseCase;
let criarPagamentoController: CriarPagamentoController;
let payload: PagamentosDtos;
let response: any;

const ID_UUID = "0";
const pagamentoDto: PagamentoDto = {
  "_id": "123456",
  "status": "Aguardando_Pagamento"
}

const pagamentoObjMock: Pagamento = {
  "pedidoId": "123456",
  "status": 'Aguardando_Pagamento'
}

const pagamentosDto: PagamentosDtos = {
  "pagamentos": [pagamentoDto]
}

Given('A module to create a new payment', () => {
  pagamentoGateway = {
    atualizarStatusPagamento: async () => null,
    criarPagamento: async () => ({
      ...pagamentoObjMock, id: ID_UUID
    }),
    listarPagamento: async () => null,
    listarTodosPagamentos: async () => []
  } as IPagamentoGateway;

  criarPagamentoUseCase = new CriarPagamentoUseCase(
    pagamentoGateway
  );
  criarPagamentoController = new CriarPagamentoController(
    criarPagamentoUseCase,
  );
});

When('Call to criarPagamentoController', async () => {
  payload = pagamentosDto

  response = await criarPagamentoController.handle(payload);
});

Then('The response should be a new payment', () => {
  assert.equal(response.length, 1);
});
