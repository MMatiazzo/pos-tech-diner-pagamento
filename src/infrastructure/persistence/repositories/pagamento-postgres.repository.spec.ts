import { IQueueGateway } from '../../../application/operation/gateways/queue/Iqueue.gateway';
import { PAGAMENTO_STATUS, Pagamento } from '../../../core/pagamento/entity/pagamento.entity';
import { PrismaService } from '../prisma/prisma.service';
import { PagamentoPostgresRepository } from './pagamento-postgres.repository';

const pagamentoDto: Pagamento = {
    pedidoId: "12345",
    status: PAGAMENTO_STATUS.AGUARDANDO_PAGAMENTO
};

const ID_UUID_MOCK = "1";

describe('Pagamento Repository', () => {
    let pagamentoRepository: PagamentoPostgresRepository;
    let prismaServiceMock: PrismaService;
    let queueGatewayMock: IQueueGateway

    beforeEach(() => {
        prismaServiceMock = {
            pagamento: {
                findUnique: jest.fn(),
                findMany: jest.fn(),
                update: jest.fn(),
                create: jest.fn(),
            },
            $connect: jest.fn(),
            $disconnect: jest.fn(),
            $transaction: jest.fn(),
        } as unknown as PrismaService;

        queueGatewayMock = {
            enviarMensagem: jest.fn(),
            receberMensagem: jest.fn(),
            deletarMensagem: jest.fn(),
        } as unknown as IQueueGateway

        pagamentoRepository = new PagamentoPostgresRepository(prismaServiceMock, queueGatewayMock);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('listar prisma.pagamento.findUnique', async () => {
        await pagamentoRepository.listar(ID_UUID_MOCK);
        expect(prismaServiceMock.pagamento.findUnique).toHaveBeenCalled();
    });

    it('listarTodos prisma.pagamento.findMany', async () => {
        await pagamentoRepository.listarTodos();
        expect(prismaServiceMock.pagamento.findMany).toHaveBeenCalled();
    });

    it('criar prisma.pagamento.create', async () => {
        await pagamentoRepository.criar(pagamentoDto);
        expect(prismaServiceMock.pagamento.create).toHaveBeenCalledWith({
            data: expect.objectContaining(pagamentoDto),
        });
    });
});
