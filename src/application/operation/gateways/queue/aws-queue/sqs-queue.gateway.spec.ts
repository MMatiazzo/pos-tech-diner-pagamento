import { SQSClient } from "@aws-sdk/client-sqs";
import { SQSQueueGateway } from "./sqs-queue.gateway";

jest.mock("@aws-sdk/client-sqs", () => {
  return {
    SQSClient: jest.fn(() => ({
      send: jest.fn()
    })),
    SendMessageCommand: jest.fn(),
    ReceiveMessageCommand: jest.fn(),
    DeleteMessageCommand: jest.fn()
  };
});

describe('SQSQueueGateway', () => {
  let sqsQueueGateway: SQSQueueGateway;
  let sqsClient: SQSClient;

  beforeEach(() => {
    sqsQueueGateway = new SQSQueueGateway();
    sqsClient = new SQSClient({});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Deve ser capaz de enviar mensagem', async () => {
    const queueUrl = 'url-queue';
    const messageBody = { foo: 'bar' };

    await sqsQueueGateway.enviarMensagem(queueUrl, messageBody);

    expect(SQSClient).toHaveBeenCalledTimes(2);
  });

  it('Receber mensagem SQS', async () => {
    const queueUrl = 'url-queue';

    await sqsQueueGateway.receberMensagem(queueUrl);

    expect(SQSClient).toHaveBeenCalledTimes(2);
  });

  it('Deletar mensagem SQS', async () => {
    const queueUrl = 'url-queue';
    const messages = {
      Messages: [
        { ReceiptHandle: 'receipt-handle-1' },
        { ReceiptHandle: 'receipt-handle-2' }
      ]
    };

    await sqsQueueGateway.deletarMensagem(queueUrl, messages);

    expect(SQSClient).toHaveBeenCalledTimes(2);
  });
});
