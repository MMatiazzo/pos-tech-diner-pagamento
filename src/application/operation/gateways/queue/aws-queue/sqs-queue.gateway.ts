import { DeleteMessageCommand, ReceiveMessageCommand, SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";
import { BadRequestException } from "@nestjs/common";
import { IQueueGateway } from "../Iqueue.gateway";

export class SQSQueueGateway implements IQueueGateway {
  private static getClient() {

    console.log('process.env.AWS_REGION => ', process.env.AWS_REGION);
    console.log('process.env.AWS_ACESS_KEY_ID => ', process.env.AWS_ACCESS_KEY_ID_B64);
    console.log('process.env.AWS_SECRET_ACESS_KEY => ', process.env.AWS_SECRET_ACCESS_KEY_B64);

    const client = new SQSClient({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID_B64,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_B64
      },
      // endpoint: "http://sqs.us-east-1.localhost.localstack.cloud:4566" // tirar dps
    });

    return client;
  }

  async enviarMensagem(queueUrl: string, messageBody: any): Promise<void> {
    try {
      const client = SQSQueueGateway.getClient();

      const command = new SendMessageCommand({
        MessageBody: JSON.stringify(messageBody),
        QueueUrl: queueUrl,
      });

      const response = await client.send(command);
      console.info(`response => ${response}`);
    } catch (err) {
      console.error(`error on sqs-queue => ${err}`);
      throw new BadRequestException(err);
    }
  }

  async receberMensagem(queueUrl: string) {
    const client = SQSQueueGateway.getClient();

    const command = new ReceiveMessageCommand({
      QueueUrl: queueUrl,
      MaxNumberOfMessages: 8
    });

    const response = await client.send(command);

    return response;
  }

  async deletarMensagem(queueUrl: string, mensagens: any) {
    if (mensagens?.Messages.length) {
      const client = SQSQueueGateway.getClient();

      const messagesToDelete = mensagens.Messages.map((message: any) => {
        const input2 = {
          QueueUrl: queueUrl,
          ReceiptHandle: message.ReceiptHandle, // required
        };

        const command2 = new DeleteMessageCommand(input2);
        return client.send(command2);
      });

      await Promise.all(messagesToDelete)
        .then((value => console.info('value => ', value)))
        .catch(err => console.error('err => ', err));
    }
  }
}