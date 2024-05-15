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

describe('SQSQueueGateway Test Suite', () => {
  let sqsQueueGateway: SQSQueueGateway;
  let sqsClient: SQSClient;

  beforeEach(() => {
    sqsQueueGateway = new SQSQueueGateway();
    sqsClient = new SQSClient({});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should send message', async () => {
    const queueUrl = 'some-queue-url';
    const messageBody = { foo: 'bar' };

    await sqsQueueGateway.enviarMensagem(queueUrl, messageBody);

    expect(SQSClient).toHaveBeenCalledTimes(2);
  });

  it('Receber mensagem SQS', async () => {
    const queueUrl = 'some-queue-url';

    await sqsQueueGateway.receberMensagem(queueUrl);

    expect(SQSClient).toHaveBeenCalledTimes(2);
  });

  it('Deletar mensagem SQS', async () => {
    const queueUrl = 'some-queue-url';
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
