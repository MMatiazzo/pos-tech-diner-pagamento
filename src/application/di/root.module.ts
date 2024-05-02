import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PagamentoModule } from './pagamento.module';

@Module({
  imports: [PagamentoModule, ConfigModule.forRoot()],
  controllers: [],
})
export class RootModule { }
