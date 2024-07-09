import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PagamentoModule } from './pagamento.module';
import { GlobalExceptionFilter } from '../api/http-rest/global-exception/global.exception';
import { APP_FILTER } from '@nestjs/core';

@Module({
  imports: [PagamentoModule, ConfigModule.forRoot()],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ]
})
export class RootModule { }
