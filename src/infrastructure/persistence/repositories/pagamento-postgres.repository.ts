import { Inject, Injectable } from '@nestjs/common';
import { Pagamento } from 'src/core/pagamento/entity/pagamento.entity';
import { PrismaService } from 'src/infrastructure/persistence/prisma/prisma.service';
import { IPagamentoRepository } from './Ipagamento.repository';

@Injectable()
export class PagamentoPostgresRepository implements IPagamentoRepository {
  constructor(
    @Inject(PrismaService)
    private prisma: PrismaService,
  ) { }

  async listar(id: string): Promise<Pagamento> {
    return await this.prisma.pagamento.findUnique({
      where: {
        pedidoId: id,
      },
    });
  }

  async editar(id: string, campo: string, valor: string): Promise<Pagamento> {
    const updateData = { [campo]: valor };
    return this.prisma.pagamento.update({
      where: {
        id,
      },
      data: updateData,
    });
  }

  async criar(pagamento: Pagamento): Promise<Pagamento> {
    console.log(pagamento)
    const novoPagamento = await this.prisma.pagamento.create({
      data: pagamento,
    });
    return novoPagamento;
  }
}
