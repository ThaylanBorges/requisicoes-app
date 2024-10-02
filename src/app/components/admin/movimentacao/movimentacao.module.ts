import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovimentacaoRoutingModule } from './movimentacao-routing.module';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [],
  imports: [CommonModule, MovimentacaoRoutingModule, NgSelectModule],
})
export class MovimentacaoModule {}
